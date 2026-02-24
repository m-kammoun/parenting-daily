import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function OnboardingButton({ label, onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.purple,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: COLORS.purpleDark,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});
