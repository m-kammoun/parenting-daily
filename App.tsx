import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import AgeSelectionScreen from "./src/screens/onboarding/AgeSelectionScreen";
import NotificationSetupScreen from "./src/screens/onboarding/NotificationSetupScreen";
import NotificationPromptScreen from "./src/screens/onboarding/NotificationPromptScreen";
import { AgeCategory, OnboardingStep } from "./src/types";

export default function App() {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.Welcome);
  const [ageCategory, setAgeCategory] = useState<AgeCategory | null>(null);

  const handleAgeSelected = (category: AgeCategory) => {
    setAgeCategory(category);
    setStep(OnboardingStep.NotificationSetup);
  };

  const handleNotificationSetupComplete = (hour: number, minute: number) => {
    // TODO: persist ageCategory + notification time, navigate to main screen
    console.log("Onboarding complete:", { ageCategory, hour, minute });
    setStep(OnboardingStep.Done);
  };

  return (
    <SafeAreaProvider>
      {step === OnboardingStep.Welcome && (
        <WelcomeScreen onGetStarted={() => setStep(OnboardingStep.AgeSelection)} />
      )}
      {step === OnboardingStep.AgeSelection && (
        <AgeSelectionScreen onComplete={handleAgeSelected} />
      )}
      {step === OnboardingStep.NotificationSetup && (
        <NotificationSetupScreen
          onComplete={handleNotificationSetupComplete}
          onPermissionDenied={() => setStep(OnboardingStep.NotificationPrompt)}
        />
      )}
      {step === OnboardingStep.NotificationPrompt && (
        <NotificationPromptScreen
          onComplete={() => setStep(OnboardingStep.Done)}
          onSkip={() => setStep(OnboardingStep.Done)}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
