import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColors } from "@/theme";
import { Fact } from "@assets/data/facts";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  item: Fact;
  isVisible: boolean;
  onInfo: () => void;
}

export default function FactCard({ item, isVisible, onInfo }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [isVisible, opacity]);

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
      <Animated.View style={[styles.content, { opacity }]}>
        <Animated.Text style={[styles.factText, { color: C.text }]}>{item.text}</Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.actions, { bottom: insets.bottom + 128, opacity }]}>
        <TouchableOpacity onPress={onInfo} activeOpacity={0.6}>
          <AntDesign name="info-circle" size={40} color={C.text} />
        </TouchableOpacity>
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
    gap: 48,
  },
  actions: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  factText: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.3,
  },
});
