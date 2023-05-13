import { hookstate, useHookstate } from "@hookstate/core";
import * as Crypto from "expo-crypto";
import { Habit } from "../types";
import { useDatabase } from "../contexts/databaseContext";

const habitState = hookstate<Habit[]>([]);

export const useHabitState = () => {
  const { db } = useDatabase();
  const habits = useHookstate(habitState);

  function getHabits() {
    db.transaction((tx) => {
      console.log("get habits");
      tx.executeSql(`select * from habits;`, [], (_, { rows: { _array } }) =>
        habits.set(_array)
      );
    });
  }

  function addHabit(
    title: string,
    daysPerWeek: number,
    color: string,
    startDate: Date
  ) {
    const UUID = Crypto.randomUUID();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into habits (id, title, days_per_week, color, start_date) values (?, ?, ?, ?, ?)",
          [UUID, title, daysPerWeek, color, String(startDate)]
        );
        tx.executeSql(
          "select * from habits where id = ?",
          [UUID],
          (_, { rows: { _array } }) => habits.merge([..._array])
        );
      },
      () => console.log("error"),
      () => console.log("success")
    );
  }

  return {
    habits,
    getHabits,
    addHabit,
  };
};
