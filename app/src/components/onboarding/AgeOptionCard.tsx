import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useColors } from "@/theme";

interface AgeOptionCardProps {
  label: string;
  description: string;
  onPress: () => void;
}

export default function AgeOptionCard({ label, description, onPress }: AgeOptionCardProps) {
  const C = useColors();
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: C.border, backgroundColor: C.card }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, { color: C.text }]}>{label}</Text>
      <Text style={[styles.description, { color: C.textMuted }]}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
  },
});
