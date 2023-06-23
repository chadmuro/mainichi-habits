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
      },
      () => {
        setLoaded(true);
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
        where n.id = ?;`,
        [UUID],
        (_, { rows: { _array } }) => notifications.merge([..._array])
      );
    });
  }

  function updateDbNotification(
    id: string,
    days: string,
    identifiers: string,
    hour: number,
    minute: number
  ) {
    db.transaction((tx) => {
      tx.executeSql(
        "update notifications set days = ?, identifiers = ?, hour = ?, minute = ? where id = ?",
        [days, identifiers, hour, minute, id]
      );
      tx.executeSql(
        `select n.id, n.habit_id, n.days, n.identifiers, n.hour, n.minute, h.title
        from notifications n
        inner join habits h on h.id = n.habit_id
        where n.id = ?;`,
        [id],
        (_, { rows: { _array } }) => {
          const index = notifications.get().findIndex((notification) => {
            return notification.id === id;
          });
          if (index !== -1) {
            notifications[index].set(_array[0]);
          }
        }
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
    notifications,
    addNotification,
    updateDbNotification,
    deleteDbNotification,
  };
};
