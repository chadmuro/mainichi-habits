import { useState } from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useDatabase } from "../contexts/databaseContext";
import { Notification } from "../types";

const notificationState = hookstate<Notification[] | null>(null);

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
          `select * from notifications;`,
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
    identifier: string,
    habitId: string,
    day: number,
    hour: number,
    minute: number
  ) {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into notifications (id, habit_id, day, hour, minute) values (?, ?, ?, ?, ?)",
        [identifier, habitId, day, hour, minute]
      );
      tx.executeSql(
        "select * from notifications where id = ?",
        [identifier],
        (_, { rows: { _array } }) => notifications.merge([..._array])
      );
    });
  }

  return { loaded, getNotifications, addNotification, notifications };
};
