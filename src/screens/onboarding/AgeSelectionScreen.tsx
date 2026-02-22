import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgeCategory } from "../../types";
import { useNotificationPermission } from "../../hooks/useNotificationPermission";

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

export default function AgeSelectionScreen() {
  const [selected, setSelected] = useState<AgeCategory | null>(null);
  const { requestPermission } = useNotificationPermission();

  const handleContinue = async () => {
    if (!selected) return;
    const permissionStatus = await requestPermission();
    // TODO: persist selection and navigate to main screen
    console.log("Selected age category:", selected);
    console.log("Notification permission:", permissionStatus);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to{"\n"}Daily Parenting</Text>
        <Text style={styles.subtitle}>
          How old is your child? We'll tailor every daily insight to your stage.
        </Text>

        <View style={styles.options}>
          {AGE_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelected(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                    {option.label}
                  </Text>
                  <Text
                    style={[styles.cardDescription, isSelected && styles.cardDescriptionSelected]}
                  >
                    {option.description}
                  </Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, !selected && styles.buttonTextDisabled]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = "#6366F1";
const PURPLE_LIGHT = "#EEF2FF";
const PURPLE_DARK = "#4F46E5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  options: {
    gap: 14,
    marginBottom: 36,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  cardSelected: {
    borderColor: PURPLE,
    backgroundColor: PURPLE_LIGHT,
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 3,
  },
  cardLabelSelected: {
    color: PURPLE_DARK,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  cardDescriptionSelected: {
    color: PURPLE,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  radioSelected: {
    borderColor: PURPLE,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PURPLE,
  },
  button: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonTextDisabled: {
    color: "#9CA3AF",
  },
});
