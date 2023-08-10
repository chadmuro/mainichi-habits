import { useState } from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useDatabase } from "../contexts/databaseContext";
import { Settings } from "../types";
import dayjs from "dayjs";

const settingsState = hookstate<Settings | null>(null);

export const useSettingsState = () => {
  const { db } = useDatabase();
  const settings = useHookstate(settingsState);
  const [loaded, setLoaded] = useState(false);

  function getSettings() {
    setLoaded(false);
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from settings;`,
          [],
          (_, { rows: { _array } }) => settings.set(_array[0])
        );
      },
      () => {
        setLoaded(true);
      },
      () => {
        setLoaded(true);
        // Add week_start column to settings
        if (settings.get()?.week_start === undefined) {
          db.transaction((tx) => {
            tx.executeSql(
              "alter table settings add column week_start integer default 0 not null;"
            );
            tx.executeSql(
              `select * from settings;`,
              [],
              (_, { rows: { _array } }) => settings.set(_array[0])
            );
          });
        }

        // Add last_login column to settings
        if (!settings.get()?.last_login) {
          const today = dayjs().format("YYYY-MM-DD");
          db.transaction((tx) => {
            tx.executeSql("alter table settings add column last_login text");
            tx.executeSql("update settings set last_login = ? where id = 1;", [
              today,
            ]);
            tx.executeSql(
              `select * from settings;`,
              [],
              (_, { rows: { _array } }) => settings.set(_array[0])
            );
          });
        }

        // Add ask_review column to settings
        if (settings.get()?.ask_review === undefined) {
          db.transaction((tx) => {
            tx.executeSql(
              "alter table settings add column ask_review default 0 not null"
            );
            tx.executeSql(
              `select * from settings;`,
              [],
              (_, { rows: { _array } }) => settings.set(_array[0])
            );
          });
        }
      }
    );
  }

  function updateSettings(column: string, value: string | number) {
    db.transaction((tx) => {
      tx.executeSql(`update settings set ${column} = ? where id = 1;`, [value]);
      tx.executeSql(`select * from settings;`, [], (_, { rows: { _array } }) =>
        settings.set(_array[0])
      );
    });
  }

  return { settings, loaded, getSettings, updateSettings };
};
