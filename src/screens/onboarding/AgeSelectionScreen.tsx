import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgeCategory } from "../../types";
import { COLORS } from "../../theme";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import AgeOptionCard from "../../components/onboarding/AgeOptionCard";

interface AgeOption {
  id: AgeCategory;
  label: string;
  description: string;
}

const AGE_OPTIONS: AgeOption[] = [
  {
    id: AgeCategory.Prenatal,
    label: "Prenatal",
    description: "Expecting a baby",
  },
  {
    id: AgeCategory.ZeroToOne,
    label: "Less than 1 year",
    description: "Infant (0–12 months)",
  },
  {
    id: AgeCategory.OneToThree,
    label: "Between 1 and 3 years",
    description: "Toddler (1–3 years)",
  },
];

interface Props {
  onComplete?: (category: AgeCategory) => void;
}

export default function AgeSelectionScreen({ onComplete }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <OnboardingHeader
          title="How old is your child?"
          subtitle="We'll tailor every daily insight to your stage."
        />

        <View style={styles.options}>
          {AGE_OPTIONS.map((option) => (
            <AgeOptionCard
              key={option.id}
              label={option.label}
              description={option.description}
              onPress={() => onComplete?.(option.id)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  options: {
    gap: 14,
    marginTop: 8,
  },
});
