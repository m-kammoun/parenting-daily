import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

interface AgeOptionCardProps {
  label: string;
  description: string;
  onPress: () => void;
}

export default function AgeOptionCard({ label, description, onPress }: AgeOptionCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
  },
  label: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
