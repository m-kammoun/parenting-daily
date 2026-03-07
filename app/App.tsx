import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import AgeSelectionScreen from "./src/screens/onboarding/AgeSelectionScreen";
import NotificationSetupScreen from "./src/screens/onboarding/NotificationSetupScreen";
import NotificationPromptScreen from "./src/screens/onboarding/NotificationPromptScreen";
import FeedScreen from "./src/screens/feed/FeedScreen";
import { useOnboardingState } from "./src/hooks/useOnboardingState";
import { AgeCategory, OnboardingStep } from "./src/types";

export default function App() {
  const { isOnboardingComplete, completeOnboarding } = useOnboardingState();
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.Welcome);
  const [setAgeCategory] = useState<AgeCategory | null>(null);

  // Still loading persisted state
  if (isOnboardingComplete === null) {
    return <View style={styles.splash} />;
  }

  // Already onboarded — go straight to the feed
  if (isOnboardingComplete) {
    return (
      <SafeAreaProvider>
        <FeedScreen />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  const handleAgeSelected = (category: AgeCategory) => {
    setAgeCategory(category);
    setStep(OnboardingStep.NotificationSetup);
  };

  const handleOnboardingDone = async () => {
    await completeOnboarding();
  };

  const handleNotificationSetupComplete = () => {
    void handleOnboardingDone();
  };

  return (
    <SafeAreaProvider>
      {step === OnboardingStep.Welcome && (
        <WelcomeScreen
          onGetStarted={() => {
            setStep(OnboardingStep.AgeSelection);
          }}
        />
      )}
      {step === OnboardingStep.AgeSelection && (
        <AgeSelectionScreen onComplete={handleAgeSelected} />
      )}
      {step === OnboardingStep.NotificationSetup && (
        <NotificationSetupScreen
          onComplete={handleNotificationSetupComplete}
          onPermissionDenied={() => {
            setStep(OnboardingStep.NotificationPrompt);
          }}
        />
      )}
      {step === OnboardingStep.NotificationPrompt && (
        <NotificationPromptScreen
          onComplete={() => {
            void handleOnboardingDone();
          }}
          onSkip={() => {
            void handleOnboardingDone();
          }}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
