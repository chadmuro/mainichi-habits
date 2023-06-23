import { useState } from "react";
import { hookstate, useHookstate, none } from "@hookstate/core";
import * as Crypto from "expo-crypto";
import { Check } from "../types";
import { useDatabase } from "../contexts/databaseContext";

const checkState = hookstate<Check[]>([]);

export const useCheckState = () => {
  const { db } = useDatabase();
  const checks = useHookstate(checkState);
  const [loaded, setLoaded] = useState(false);

  function getChecks() {
    setLoaded(false);
    db.transaction(
      (tx) => {
        tx.executeSql(`select * from checks;`, [], (_, { rows: { _array } }) =>
          checks.set(_array)
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

  function addCheck(habitId: string, date: string) {
    const UUID = Crypto.randomUUID();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into checks (id, habit_id, date) values (?, ?, ?)",
        [UUID, habitId, date]
      );
      tx.executeSql(
        "select * from checks where id = ?",
        [UUID],
        (_, { rows: { _array } }) => checks.merge([..._array])
      );
    });
  }

  function deleteCheck(id: string) {
    db.transaction((tx) => {
      tx.executeSql("delete from checks where id = ?", [id]);
      const index = checks.get().findIndex((check) => {
        return check.id === id;
      });
      if (index !== -1) {
        checks[index].set(none);
      }
    });
  }

  return {
    checks,
    loaded,
    getChecks,
    addCheck,
    deleteCheck,
  };
};
