import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";
import { useColors } from "@/theme";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import NotificationPreviewCard from "@/components/onboarding/NotificationPreviewCard";
import TimePickerRow from "@/components/onboarding/TimePickerRow";
import { NotificationPermissionStatus } from "@/types";

function buildDate(hour: number, minute: number): Date {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

interface Props {
  onComplete: (hour: number, minute: number) => void;
  onPermissionDenied: () => void;
}

export default function NotificationSetupScreen({ onComplete, onPermissionDenied }: Props) {
  const [time, setTime] = useState<Date>(buildDate(20, 0));
  const { requestPermission } = useNotificationPermission();
  const C = useColors();

  const handleSave = async () => {
    const result = await requestPermission();
    if (result === NotificationPermissionStatus.Granted) {
      onComplete(time.getHours(), time.getMinutes());
    } else {
      // Denied or permanently blocked — both go to the prompt screen
      onPermissionDenied();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <OnboardingHeader
          title="Get your daily parenting insight"
          subtitle="Allow notifications to receive your insight every day"
        />

        <NotificationPreviewCard />

        <TimePickerRow time={time} onChange={setTime} />
      </View>

      <View style={styles.footer}>
        <OnboardingButton
          label="Allow and Save"
          onPress={() => {
            void handleSave();
          }}
        />
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
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 16,
  },
});
