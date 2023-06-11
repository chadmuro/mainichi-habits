import * as Notifications from "expo-notifications";

export function useNotifications() {
  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  async function createNotification(title: string, seconds: number) {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
      },
      trigger: {
        seconds,
        repeats: true,
      },
    });
    return identifier;
  }

  return { requestPermissionsAsync, createNotification };
}
