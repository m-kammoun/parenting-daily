/**
 * useSupabaseOnboarding
 *
 * Handles the full onboarding registration flow:
 *   1. Sign in anonymously with Supabase Auth (or reuse an existing session)
 *   2. Write / upsert the user's profile row (age bucket, timezone, platform, push token)
 *   3. Persist a local flag so the app knows onboarding is complete
 *
 * The hook is the single source of truth for onboarding state.
 * AsyncStorage is only used as a fast local cache — the real state lives in Supabase.
 */

import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";
import { AgeCategory } from "@/types";

const ONBOARDING_KEY = "onboarding_complete";

// Maps our enum values to the age_buckets.key column in the DB
const AGE_BUCKET_KEY: Record<AgeCategory, string> = {
  [AgeCategory.Prenatal]: "prenatal",
  [AgeCategory.ZeroToOne]: "0-1",
  [AgeCategory.OneToThree]: "1-3",
};

export interface OnboardingRegistrationParams {
  ageCategory: AgeCategory;
  /** Notification hour in 24 h format (e.g. 20) */
  notificationHour: number;
  /** Notification minute (e.g. 0) */
  notificationMinute: number;
}

export function useSupabaseOnboarding() {
  /**
   * null  = still loading from AsyncStorage
   * false = not yet onboarded
   * true  = onboarding complete
   */
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─── Restore local cache on mount ───────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => {
        setIsOnboardingComplete(value === "true");
      })
      .catch(() => {
        setIsOnboardingComplete(false);
      });
  }, []);

  // ─── Registration ────────────────────────────────────────────────────────────
  const register = async (params: OnboardingRegistrationParams): Promise<boolean> => {
    setIsRegistering(true);
    setError(null);

    try {
      // 1. Ensure we have a Supabase auth session (anonymous sign-in)
      const { data: sessionData } = await supabase.auth.getSession();
      let userId: string;

      if (sessionData.session?.user) {
        userId = sessionData.session.user.id;
      } else {
        const { data: signInData, error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError || !signInData.user) {
          throw new Error(signInError?.message ?? "Anonymous sign-in failed");
        }
        userId = signInData.user.id;
      }

      // 2. Resolve the age_bucket_id from the age_buckets reference table
      const bucketKey = AGE_BUCKET_KEY[params.ageCategory];
      const { data: bucket, error: bucketError } = await supabase
        .from("age_buckets")
        .select("id")
        .eq("key", bucketKey)
        .single<{ id: number }>();

      if (bucketError) {
        throw new Error(bucketError.message);
      }

      // 3. Get the Expo push token (only works on real physical devices)
      let pushToken: string | null = null;
      if (Device.isDevice) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extra = Constants.expoConfig?.extra as Record<string, any> | undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const projectId = extra?.eas?.projectId as string | undefined;
        if (projectId) {
          const tokenResponse = await Notifications.getExpoPushTokenAsync();
          pushToken = tokenResponse.data;
        }
      }

      // 4. Compute the user's local timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // 5. Compute the next scheduled send time based on the chosen hour/minute
      const now = new Date();
      const next = new Date();
      next.setHours(params.notificationHour, params.notificationMinute, 0, 0);
      // If the chosen time has already passed today, schedule for tomorrow
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }

      // 6. Upsert the user profile row
      const { error: upsertError } = await supabase.from("users").upsert(
        {
          id: userId,
          age_bucket_id: bucket.id,
          timezone,
          platform: Platform.OS as "ios" | "android",
          push_token: pushToken,
          next_scheduled_send: next.toISOString(),
          app_version: Constants.expoConfig?.version ?? null,
        },
        { onConflict: "id" }
      );

      if (upsertError) {
        throw new Error(upsertError.message);
      }

      // 7. Mark onboarding complete locally
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      setIsOnboardingComplete(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error during registration";
      console.error("[useSupabaseOnboarding] registration failed:", message);
      setError(message);
      return false;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    isOnboardingComplete,
    isRegistering,
    error,
    register,
  };
}
