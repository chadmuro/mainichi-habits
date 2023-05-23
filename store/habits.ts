import { hookstate, none, useHookstate } from "@hookstate/core";
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
    startDate: string
  ) {
    const UUID = Crypto.randomUUID();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into habits (id, title, days_per_week, color, start_date) values (?, ?, ?, ?, ?)",
          [UUID, title, daysPerWeek, color, startDate]
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

  function deleteHabit(id: string) {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from habits where id = ?", [id]);
        tx.executeSql("delete from checks where habit_id = ?", [id]);

        const index = habits.get().findIndex((habit) => {
          return habit.id === id;
        });
        if (index !== -1) {
          habits[index].set(none);
        }
      },
      () => console.log("error"),
      () => console.log("success")
    );
  }

  return {
    habits,
    getHabits,
    addHabit,
    deleteHabit,
  };
};
