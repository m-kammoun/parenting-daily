import { useColorScheme } from "react-native";

const dark = {
  background: "#1C1C1E",
  card: "#2C2C2E",
  cardAlt: "#3A3A3C",
  border: "#3A3A3C",
  purple: "#6366F1",
  purpleDark: "#4F46E5",
  text: "#FFFFFF",
  textMuted: "#A1A1AA",
  textDim: "#6B6B6B",
  modalOverlay: "rgba(0,0,0,0.55)",
};

const light = {
  background: "#F2F2F7",
  card: "#FFFFFF",
  cardAlt: "#E5E5EA",
  border: "#D1D1D6",
  purple: "#6366F1",
  purpleDark: "#4F46E5",
  text: "#111827",
  textMuted: "#6B7280",
  textDim: "#9CA3AF",
  modalOverlay: "rgba(0,0,0,0.35)",
};

export type ColorTheme = typeof dark;

export function useColors(): ColorTheme {
  const scheme = useColorScheme();
  return scheme === "dark" ? dark : light;
}
