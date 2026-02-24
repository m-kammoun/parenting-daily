import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme";
import OnboardingButton from "../../components/onboarding/OnboardingButton";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import WelcomeIllustration from "../../components/onboarding/WelcomeIllustration";

interface Props {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <WelcomeIllustration />

      <View style={styles.textContent}>
        <OnboardingHeader
          title={"Expand your parenting\nknowledge in 1 minute\na day"}
          subtitle="Learn parenting insights with a new daily habit that takes just 1 minute."
        />
      </View>

      <View style={styles.footer}>
        <OnboardingButton label="Get started" onPress={onGetStarted} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  textContent: {
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
});
