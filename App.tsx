import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import AgeSelectionScreen from "./src/screens/onboarding/AgeSelectionScreen";
import NotificationSetupScreen from "./src/screens/onboarding/NotificationSetupScreen";
import { AgeCategory } from "./src/types";

type OnboardingStep = "welcome" | "age-selection" | "notification-setup" | "done";

export default function App() {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [ageCategory, setAgeCategory] = useState<AgeCategory | null>(null);

  const handleAgeSelected = (category: AgeCategory) => {
    setAgeCategory(category);
    setStep("notification-setup");
  };

  const handleNotificationSetupComplete = (hour: number, minute: number) => {
    // TODO: persist ageCategory + notification time, navigate to main screen
    console.log("Onboarding complete:", { ageCategory, hour, minute });
    setStep("done");
  };

  return (
    <SafeAreaProvider>
      {step === "welcome" && <WelcomeScreen onGetStarted={() => setStep("age-selection")} />}
      {step === "age-selection" && <AgeSelectionScreen onComplete={handleAgeSelected} />}
      {step === "notification-setup" && (
        <NotificationSetupScreen onComplete={handleNotificationSetupComplete} />
      )}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
