import { useState } from "react";
import * as Crypto from "expo-crypto";
import { hookstate, none, useHookstate } from "@hookstate/core";
import { useDatabase } from "../contexts/databaseContext";
import { Notification } from "../types";

const notificationState = hookstate<Notification[]>([]);

export const useNotificationState = () => {
  const { db } = useDatabase();
  const notifications = useHookstate(notificationState);
  const [loaded, setLoaded] = useState(false);

  function getNotifications() {
    setLoaded(false);
    db.transaction(
      (tx) => {
        console.log("get notifications");
        tx.executeSql(
          `select n.id, n.habit_id, n.days, n.identifiers, n.hour, n.minute, h.title
          from notifications n
          inner join habits h on h.id = n.habit_id;`,
          [],
          (_, { rows: { _array } }) => notifications.set(_array)
        );
      },
      () => {
        setLoaded(true);
        console.log("noficications error");
      },
      () => {
        setLoaded(true);
        console.log("noficications success");
      }
    );
  }

  function addNotification(
    habitId: string,
    days: string,
    identifiers: string,
    hour: number,
    minute: number
  ) {
    const UUID = Crypto.randomUUID();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into notifications (id, habit_id, days, identifiers, hour, minute) values (?, ?, ?, ?, ?, ?)",
        [UUID, habitId, days, identifiers, hour, minute]
      );
      tx.executeSql(
        `select n.id, n.habit_id, n.days, n.identifiers, n.hour, n.minute, h.title
        from notifications n
        inner join habits h on h.id = n.habit_id
        where id = ?;`,
        [UUID],
        (_, { rows: { _array } }) => notifications.merge([..._array])
      );
    });
  }

  function deleteDbNotification(notificationId: string) {
    db.transaction((tx) => {
      tx.executeSql("delete from notifications where id = ?", [notificationId]);

      const index = notifications.get().findIndex((notification) => {
        return notification.id === notificationId;
      });
      if (index !== -1) {
        notifications[index].set(none);
      }
    });
  }

  return {
    loaded,
    getNotifications,
    addNotification,
    notifications,
    deleteDbNotification,
  };
};
