import * as Notifications from "expo-notifications";
import { Weekday } from "../types";
import { useNotificationState } from "../store/notifications";

export function useNotifications() {
  const { addNotification } = useNotificationState();
  async function requestPermissionsAsync() {
    // await Notifications.cancelAllScheduledNotificationsAsync();
    const notifs = await Notifications.getAllScheduledNotificationsAsync();
    console.log(notifs);
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  async function createNotification(
    habitId: string,
    body: string,
    hour: number,
    minute: number,
    weekday: Weekday[] | "daily"
  ) {
    if (weekday === "daily") {
      const trigger: Notifications.NotificationTriggerInput = {
        hour,
        minute,
        repeats: true,
      };

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Mainichi Habits",
          body: `Don't forget to ${body} today!`,
        },
        trigger,
      });

      addNotification(habitId, "0", identifier, hour, minute);
      return identifier;
    }

    const notificationPromises = weekday.map((day) => {
      const trigger: Notifications.NotificationTriggerInput = {
        hour,
        minute,
        weekday: day,
        repeats: true,
      };

      const notificationPromise = Notifications.scheduleNotificationAsync({
        content: {
          title: "Mainichi Habits",
          body: `Don't forget to ${body} today!`,
        },
        trigger,
      });

      return notificationPromise;
    });

    const identifiers = await Promise.all(notificationPromises);

    addNotification(
      habitId,
      weekday.join(","),
      identifiers.join(","),
      hour,
      minute
    );
    return identifiers;
  }

  return { requestPermissionsAsync, createNotification };
}
