import { useState } from "react";
import * as Notifications from "expo-notifications";

export type PermissionStatus = "idle" | "granted" | "denied";

export function useNotificationPermission() {
  const [status, setStatus] = useState<PermissionStatus>("idle");

  const requestPermission = async (): Promise<PermissionStatus> => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus === "granted") {
      setStatus("granted");
      return "granted";
    }

    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    const result = newStatus === "granted" ? "granted" : "denied";
    setStatus(result);
    return result;
  };

  return { status, requestPermission };
}
