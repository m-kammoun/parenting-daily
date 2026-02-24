import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

interface Props {
  title: string;
  subtitle: string;
}

export default function OnboardingHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
});
