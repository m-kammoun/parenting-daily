import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColors } from "@/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// How far below the screen the text starts before sliding in
const TEXT_INITIAL_OFFSET = 180;

interface Props {
  isVisible: boolean;
}

export default function WelcomeCard({ isVisible }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  // Text slides up from below on first appear
  const textY = useRef(new Animated.Value(TEXT_INITIAL_OFFSET)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  // Looping swipe-up hint
  const swipeHintY = useRef(new Animated.Value(0)).current;
  const swipeHintOpacity = useRef(new Animated.Value(1)).current;

  // Slide-in text when card becomes visible
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(textY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset for if the card becomes visible again
      textY.setValue(TEXT_INITIAL_OFFSET);
      textOpacity.setValue(0);
    }
  }, [isVisible, textY, textOpacity]);

  // Looping chevron bounce
  useEffect(() => {
    if (!isVisible) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(swipeHintY, {
            toValue: -12,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(swipeHintOpacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(swipeHintY, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(swipeHintOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(500),
      ])
    );

    loop.start();
    return () => {
      loop.stop();
    };
  }, [isVisible, swipeHintY, swipeHintOpacity]);

  return (
    <View
      style={[
        styles.slide,
        {
          height: SCREEN_HEIGHT,
          backgroundColor: C.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      {/* Welcome text — slides up from below */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: textOpacity,
            transform: [{ translateY: textY }],
          },
        ]}
      >
        <Animated.Text style={[styles.welcomeText, { color: C.text }]}>
          Welcome to your{"\n"}parenting daily
        </Animated.Text>
      </Animated.View>

      {/* Swipe-up hint */}
      <Animated.View
        style={[
          styles.swipeHint,
          {
            bottom: insets.bottom + 48,
            opacity: swipeHintOpacity,
            transform: [{ translateY: swipeHintY }],
          },
        ]}
      >
        <AntDesign name="up" size={20} color={C.textMuted} />
        <Animated.Text style={[styles.swipeLabel, { color: C.textMuted }]}>Swipe up</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 36,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  swipeHint: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 6,
  },
  swipeLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
});
