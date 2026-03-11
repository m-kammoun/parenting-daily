import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WELCOME_SEEN_KEY = "welcome_seen";

export function useWelcomeSeen() {
  const [isWelcomeSeen, setIsWelcomeSeen] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(WELCOME_SEEN_KEY)
      .then((value) => {
        setIsWelcomeSeen(value === "true");
      })
      .catch(() => {
        setIsWelcomeSeen(false);
      });
  }, []);

  const markWelcomeSeen = () => {
    void AsyncStorage.setItem(WELCOME_SEEN_KEY, "true");
    setIsWelcomeSeen(true);
  };

  return { isWelcomeSeen, markWelcomeSeen };
}
