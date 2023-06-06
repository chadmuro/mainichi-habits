import { useState } from "react";
import * as Crypto from "expo-crypto";
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

  function addNotification(habitId: string, days: string, time: string) {
    const UUID = Crypto.randomUUID();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into notifications (id, habit_id, daysk, time) values (?, ?, ?, ?)",
        [UUID, habitId, days, time]
      );
      tx.executeSql(
        "select * from notifications where id = ?",
        [UUID],
        (_, { rows: { _array } }) => notifications.merge([..._array])
      );
    });
  }

  return { loaded, getNotifications, addNotification, notifications };
};
