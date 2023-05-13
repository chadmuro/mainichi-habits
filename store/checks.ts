import { hookstate, useHookstate, none } from "@hookstate/core";
import * as Crypto from "expo-crypto";
import { Check } from "../types";
import { useDatabase } from "../contexts/databaseContext";

const checkState = hookstate<Check[]>([]);

export const useCheckState = () => {
  const { db } = useDatabase();
  const checks = useHookstate(checkState);

  function getChecks() {
    db.transaction((tx) => {
      console.log("get checks");
      tx.executeSql(`select * from checks;`, [], (_, { rows: { _array } }) =>
        checks.set(_array)
      );
    });
  }

  function addCheck(habitId: string, date: string) {
    const UUID = Crypto.randomUUID();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into checks (id, habit_id, date) values (?, ?, ?)",
          [UUID, habitId, date]
        );
        tx.executeSql(
          "select * from checks where id = ?",
          [UUID],
          (_, { rows: { _array } }) => checks.merge([..._array])
        );
      },
      () => console.log("error"),
      () => console.log("success")
    );
  }

  function deleteCheck(id: string) {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from checks where id = ?", [id]);
        const index = checks.get().findIndex((check) => {
          return check.id === id;
        });
        if (index !== -1) {
          checks[index].set(none);
        }
      },
      () => console.log("error"),
      () => console.log("success")
    );
  }

  return {
    checks,
    getChecks,
    addCheck,
    deleteCheck,
  };
};
