import { useState } from "react";
import * as Notifications from "expo-notifications";
import { NotificationPermissionStatus } from "@/types";

export function useNotificationPermission() {
  const [status, setStatus] = useState<NotificationPermissionStatus>(
    NotificationPermissionStatus.Idle
  );

  const requestPermission = async (): Promise<NotificationPermissionStatus> => {
    const existing = await Notifications.getPermissionsAsync();

    if (existing.status === "granted") {
      setStatus(NotificationPermissionStatus.Granted);
      return NotificationPermissionStatus.Granted;
    }

    const requested = await Notifications.requestPermissionsAsync();

    const result =
      requested.status === "granted"
        ? NotificationPermissionStatus.Granted
        : NotificationPermissionStatus.Denied;
    setStatus(result);
    return result;
  };

  return { status, requestPermission };
}
