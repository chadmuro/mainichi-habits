import { useState } from "react";
import { hookstate, useHookstate } from "@hookstate/core";
import { useDatabase } from "../contexts/databaseContext";
import { Settings } from "react-native/types";

const settingsState = hookstate<Settings | null>(null);

export const useSettingsState = () => {
  const { db } = useDatabase();
  const settings = useHookstate(settingsState);
  const [loaded, setLoaded] = useState(false);

  function getSettings() {
    db.transaction(
      (tx) => {
        console.log("get settings");
        tx.executeSql(
          `select * from settings;`,
          [],
          (_, { rows: { _array } }) => settings.set(_array[0])
        );
      },
      () => {
        setLoaded(true);
        console.log("settings error");
      },
      () => {
        setLoaded(true);
        console.log("settings success");
      }
    );
  }

  function updateSettings(column: string, value: string) {
    db.transaction((tx) => {
      tx.executeSql(`insert into settings (?) values(?)`, [column, value]);
      tx.executeSql(`select * from settings;`, [], (_, { rows: { _array } }) =>
        settings.set(_array[0])
      );
    });
  }

  return { settings, loaded, getSettings, updateSettings };
};
