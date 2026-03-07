import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "onboarding_complete";

export function useOnboardingState() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => {
        setIsOnboardingComplete(value === "true");
      })
      .catch(() => {
        setIsOnboardingComplete(false);
      });
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setIsOnboardingComplete(true);
  };

  return { isOnboardingComplete, completeOnboarding };
}
