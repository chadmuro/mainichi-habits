import * as Notifications from "expo-notifications";
import { Weekday } from "../types";
import { useNotificationState } from "../store/notifications";

export function useNotifications() {
  const { addNotification, deleteDbNotification, updateDbNotification } =
    useNotificationState();
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
    weekday: Weekday[]
  ) {
    if (weekday.length === 7) {
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

      addNotification(habitId, weekday.join(","), identifier, hour, minute);
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

  async function updateNotification(
    notificationId: string,
    body: string,
    days: string,
    identifiers: string,
    hour: number,
    minute: number
  ) {
    // Delete old notification identifiers
    const identifiersArray = identifiers.split(",");
    const identifiersPromises = identifiersArray.map((identifier) => {
      const cancelPromise =
        Notifications.cancelScheduledNotificationAsync(identifier);
      return cancelPromise;
    });

    const cancelledIdentifiers = await Promise.all(identifiersPromises);

    const weekdays = days.split(",");

    // Add new notification identifiers
    if (weekdays.length === 7) {
      const trigger: Notifications.NotificationTriggerInput = {
        hour,
        minute,
        repeats: true,
      };

      const newIdentifiers = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Mainichi Habits",
          body: `Don't forget to ${body} today!`,
        },
        trigger,
      });

      updateDbNotification(notificationId, days, newIdentifiers, hour, minute);
      return newIdentifiers;
    }

    const notificationPromises = weekdays.map((day) => {
      const trigger: Notifications.NotificationTriggerInput = {
        hour,
        minute,
        weekday: Number(day),
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

    const newIdentifiers = await Promise.all(notificationPromises);

    updateDbNotification(
      notificationId,
      days,
      newIdentifiers.join(","),
      hour,
      minute
    );
    return newIdentifiers;
  }

  async function deleteNotification(
    notificationId: string,
    identifiers: string
  ) {
    const identifiersArray = identifiers.split(",");
    const identifiersPromises = identifiersArray.map((identifier) => {
      const cancelPromise =
        Notifications.cancelScheduledNotificationAsync(identifier);
      return cancelPromise;
    });

    const cancelledIdentifiers = await Promise.all(identifiersPromises);
    deleteDbNotification(notificationId);
  }

  return {
    requestPermissionsAsync,
    createNotification,
    updateNotification,
    deleteNotification,
  };
}
