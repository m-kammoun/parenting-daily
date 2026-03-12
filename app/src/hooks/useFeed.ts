/**
 * useFeed
 *
 * Builds the ordered list of facts shown in the feed:
 *
 *   [seed insight]  ← always present; hardcoded per age category
 *   [push insight 1 – oldest]
 *   [push insight 2]
 *   …
 *   [push insight N – most recent]
 *
 * The seed is the very first card a user sees after swiping past the welcome
 * screen at onboarding time. Each subsequent daily push notification adds one
 * more card to the bottom of the feed.
 *
 * Data source for push insights: push_logs joined with content via Supabase.
 * The user's age category is read from their profile row in the users table.
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Fact, SEED_FACTS } from "@assets/data/facts";

interface PushLogRow {
  content_id: string;
  sent_at: string;
  content: { sentence: string } | { sentence: string }[];
}

export interface UseFeedResult {
  facts: Fact[];
  /** Index to start the feed at – points to the latest item for returning users */
  initialIndex: number;
  /** true while the initial load is in progress */
  isLoading: boolean;
  /** non-null when an error occurred fetching push insights */
  error: string | null;
  /** manually re-fetch push insights (e.g. on app foreground) */
  refresh: () => void;
}

export function useFeed(): UseFeedResult {
  const [ageBucket, setAgeBucket] = useState<Fact["category"] | null>(null);
  const [pushFacts, setPushFacts] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Step 1: resolve the current user's age bucket ──────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function resolveAgeBucket() {
      try {
        const session = (await supabase.auth.getSession()).data.session;
        const userId = session?.user.id;
        if (!userId) {
          if (!cancelled) {
            setAgeBucket(null);
            setIsLoading(false);
          }
          return;
        }

        const { data: userRow } = await supabase
          .from("users")
          .select("age_bucket_id, age_buckets(key)")
          .eq("id", userId)
          .maybeSingle();

        if (cancelled) return;

        const key = (userRow as { age_buckets: { key: string } } | null)?.age_buckets.key as
          | Fact["category"]
          | undefined;

        setAgeBucket(key ?? null);
        if (!key) setIsLoading(false);
      } catch {
        if (!cancelled) {
          setAgeBucket(null);
          setIsLoading(false);
        }
      }
    }

    void resolveAgeBucket();
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Step 2: fetch push insights once we know the age bucket ────────────────
  const fetchPushInsights = useCallback(async () => {
    setError(null);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      const userId = session?.user.id;
      if (!userId) {
        setPushFacts([]);
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("push_logs")
        .select("content_id, sent_at, content(sentence)")
        .eq("user_id", userId)
        .order("sent_at", { ascending: true })
        .overrideTypes<PushLogRow[], { merge: false }>();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const fetched: Fact[] = data.map((row) => ({
        id: row.content_id,
        text: Array.isArray(row.content) ? (row.content[0]?.sentence ?? "") : row.content.sentence,
        category: ageBucket ?? "prenatal",
      }));

      setPushFacts(fetched);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load feed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [ageBucket]);

  useEffect(() => {
    if (ageBucket !== null) {
      setIsLoading(true);
      void fetchPushInsights();
    }
  }, [ageBucket, fetchPushInsights]);

  // ─── Compose final feed ──────────────────────────────────────────────────────
  const seedFact = ageBucket ? SEED_FACTS[ageBucket] : null;
  const facts: Fact[] = seedFact ? [seedFact, ...pushFacts] : pushFacts;

  return {
    facts,
    initialIndex: Math.max(0, facts.length - 1),
    isLoading,
    error,
    refresh: () => void fetchPushInsights(),
  };
}
