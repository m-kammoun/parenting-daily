import { useState } from "react";
import * as Notifications from "expo-notifications";
import { NotificationPermissionStatus } from "@/types";

export function useNotificationPermission() {
  const [status, setStatus] = useState<NotificationPermissionStatus>(
    NotificationPermissionStatus.Idle
  );

  const requestPermission = async (): Promise<NotificationPermissionStatus> => {
    const existing = await Notifications.getPermissionsAsync();

    if (existing.status === Notifications.PermissionStatus.GRANTED) {
      setStatus(NotificationPermissionStatus.Granted);
      return NotificationPermissionStatus.Granted;
    }

    const requested = await Notifications.requestPermissionsAsync();

    const result =
      requested.status === Notifications.PermissionStatus.GRANTED
        ? NotificationPermissionStatus.Granted
        : NotificationPermissionStatus.Denied;
    setStatus(result);
    return result;
  };

  return { status, requestPermission };
}
