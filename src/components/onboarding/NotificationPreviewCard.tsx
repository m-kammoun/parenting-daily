import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColors } from "@/theme";

export default function NotificationPreviewCard() {
  const C = useColors();
  return (
    <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}>
      <View style={[styles.iconWrapper, { backgroundColor: C.cardAlt }]}>
        <Text style={styles.icon}>👶</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.appName, { color: C.textMuted }]}>Daily Parenting</Text>
        <Text style={[styles.title, { color: C.text }]}>Your daily insight is ready</Text>
        <Text style={[styles.body, { color: C.textMuted }]}>
          Skin-to-skin contact in the first hour boosts bonding.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 18,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  textWrapper: {
    flex: 1,
  },
  appName: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
  },
});
