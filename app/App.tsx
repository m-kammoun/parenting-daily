import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import AgeSelectionScreen from "./src/screens/onboarding/AgeSelectionScreen";
import NotificationSetupScreen from "./src/screens/onboarding/NotificationSetupScreen";
import NotificationPromptScreen from "./src/screens/onboarding/NotificationPromptScreen";
import FeedScreen from "./src/screens/feed/FeedScreen";
import { useSupabaseOnboarding } from "./src/hooks/useSupabaseOnboarding";
import { AgeCategory, OnboardingStep } from "./src/types";

export default function App() {
  const { isOnboardingComplete, isRegistering, register } = useSupabaseOnboarding();
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.Welcome);
  const [ageCategory, setAgeCategory] = useState<AgeCategory | null>(null);
  const [notificationTime, setNotificationTime] = useState({ hour: 20, minute: 0 });

  // Still loading persisted state (not the same as registering)
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

  const handleRegister = async (hour: number, minute: number) => {
    if (!ageCategory) return;
    await register({ ageCategory, notificationHour: hour, notificationMinute: minute });
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
          isLoading={isRegistering}
          onComplete={(hour, minute) => {
            void handleRegister(hour, minute);
          }}
          onPermissionDenied={(hour: number, minute: number) => {
            setNotificationTime({ hour, minute });
            setStep(OnboardingStep.NotificationPrompt);
          }}
        />
      )}
      {step === OnboardingStep.NotificationPrompt && (
        <NotificationPromptScreen
          onComplete={() => {
            void handleRegister(notificationTime.hour, notificationTime.minute);
          }}
          onSkip={() => {
            void handleRegister(notificationTime.hour, notificationTime.minute);
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
