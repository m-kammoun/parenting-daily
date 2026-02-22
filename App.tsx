import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AgeSelectionScreen from "./src/screens/onboarding/AgeSelectionScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <AgeSelectionScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
