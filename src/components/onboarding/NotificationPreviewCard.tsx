import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export default function NotificationPreviewCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>👶</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.appName}>Daily Parenting</Text>
        <Text style={styles.title}>Your daily insight is ready</Text>
        <Text style={styles.body}>Skin-to-skin contact in the first hour boosts bonding.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.cardAlt,
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
    color: COLORS.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 2,
  },
  body: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
});
