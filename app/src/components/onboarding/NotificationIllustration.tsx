import React from "react";
import { View, StyleSheet } from "react-native";
import { useColors } from "@/theme";

export default function NotificationIllustration() {
  const C = useColors();

  return (
    <View style={styles.wrapper}>
      {/* Bell body */}
      <View style={styles.bellContainer}>
        {/* Sound waves left */}
        <View style={styles.wavesLeft}>
          <View style={[styles.wave, styles.waveOuter, { borderColor: C.purple }]} />
          <View style={[styles.wave, styles.waveInner, { borderColor: C.purple }]} />
        </View>

        {/* Bell emoji stand-in — styled block */}
        <View style={styles.bell}>
          {/* Bell top knob */}
          <View style={[styles.bellKnob, { backgroundColor: C.purple }]} />
          {/* Bell dome */}
          <View style={[styles.bellDome, { backgroundColor: C.purple }]}>
            <View style={[styles.bellShine, { backgroundColor: "rgba(255,255,255,0.18)" }]} />
          </View>
          {/* Bell base */}
          <View style={[styles.bellBase, { backgroundColor: C.purple }]} />
          {/* Bell clapper */}
          <View style={[styles.bellClapper, { backgroundColor: C.purpleDark }]} />
        </View>

        {/* Sound waves right */}
        <View style={styles.wavesRight}>
          <View style={[styles.wave, styles.waveInner, { borderColor: C.purple }]} />
          <View style={[styles.wave, styles.waveOuter, { borderColor: C.purple }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  bellContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Bell shape */
  bell: {
    alignItems: "center",
  },
  bellKnob: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: -4,
    zIndex: 1,
  },
  bellDome: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  bellShine: {
    width: 28,
    height: 48,
    borderRadius: 14,
    marginTop: 14,
    marginRight: 16,
    transform: [{ rotate: "20deg" }],
  },
  bellBase: {
    width: 130,
    height: 14,
    borderRadius: 7,
    marginTop: 0,
  },
  bellClapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 4,
  },

  /* Sound waves */
  wavesLeft: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginRight: 8,
    gap: 6,
  },
  wavesRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 6,
  },
  wave: {
    borderWidth: 3,
    borderRadius: 999,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  waveInner: {
    width: 28,
    height: 52,
  },
  waveOuter: {
    width: 42,
    height: 76,
  },
});
