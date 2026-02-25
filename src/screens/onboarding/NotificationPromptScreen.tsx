import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "@/theme";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import NotificationIllustration from "@/components/onboarding/NotificationIllustration";
import { NotificationPermissionStatus } from "@/types";

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

export default function NotificationPromptScreen({ onComplete, onSkip }: Props) {
  const C = useColors();
  const { requestPermission } = useNotificationPermission();

  const handleAllow = async () => {
    const result = await requestPermission();
    if (result === NotificationPermissionStatus.Granted) {
      onComplete();
    } else {
      // Second denial — move on
      onSkip();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <OnboardingHeader
          title={"Parenting works better\nwith reminders"}
          subtitle="Allow notifications, it'll help you build a daily habit."
        />

        <NotificationIllustration />
      </View>

      <View style={styles.footer}>
        <OnboardingButton label="Allow" onPress={handleAllow} />
        <TouchableOpacity style={styles.skipButton} onPress={onSkip} activeOpacity={0.6}>
          <Text style={[styles.skipText, { color: C.text }]}>I'm not ready yet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 16,
    gap: 4,
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 16,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
