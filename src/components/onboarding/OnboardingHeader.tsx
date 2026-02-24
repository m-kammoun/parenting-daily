import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColors } from "@/theme";

interface Props {
  title: string;
  subtitle: string;
}

export default function OnboardingHeader({ title, subtitle }: Props) {
  const C = useColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: C.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: C.textMuted }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
