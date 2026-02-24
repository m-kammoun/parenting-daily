import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../theme";

const { width } = Dimensions.get("window");

export default function WelcomeIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.blobTopLeft} />
        <View style={styles.blobBottomRight} />

        <View style={styles.card}>
          <View style={styles.iconRing}>
            <Text style={styles.emoji}>👶</Text>
          </View>

          <View style={[styles.floatingTag, styles.tagTopRight]}>
            <Text style={styles.tagText}>💡 Daily insight</Text>
          </View>
          <View style={[styles.floatingTag, styles.tagBottomLeft]}>
            <Text style={styles.tagText}>❤️ 1 min a day</Text>
          </View>
        </View>

        <View style={[styles.dot, styles.dotA]} />
        <View style={[styles.dot, styles.dotB]} />
        <View style={[styles.dot, styles.dotC]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
    paddingBottom: 8,
  },
  background: {
    width: width * 0.82,
    height: width * 0.82,
    borderRadius: 32,
    backgroundColor: "#C7C2F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blobTopLeft: {
    position: "absolute",
    top: -30,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#A5B4FC",
    opacity: 0.6,
  },
  blobBottomRight: {
    position: "absolute",
    bottom: -20,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#818CF8",
    opacity: 0.5,
  },
  card: {
    width: 180,
    height: 200,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
  },
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 48,
  },
  floatingTag: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tagTopRight: {
    top: -14,
    right: -36,
  },
  tagBottomLeft: {
    bottom: -14,
    left: -40,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  dot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotA: { width: 10, height: 10, top: 24, right: 30 },
  dotB: { width: 6, height: 6, bottom: 40, left: 24 },
  dotC: { width: 14, height: 14, top: 60, left: 20 },
});
