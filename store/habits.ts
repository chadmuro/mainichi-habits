import { useState } from "react";
import { hookstate, none, useHookstate } from "@hookstate/core";
import * as Crypto from "expo-crypto";
import { Habit } from "../types";
import { useDatabase } from "../contexts/databaseContext";

const habitState = hookstate<Habit[]>([]);

export const useHabitState = () => {
  const { db } = useDatabase();
  const habits = useHookstate(habitState);
  const [loaded, setLoaded] = useState(false);

  function getHabits() {
    db.transaction(
      (tx) => {
        console.log("get habits");
        tx.executeSql(`select * from habits;`, [], (_, { rows: { _array } }) =>
          habits.set(_array)
        );
      },
      () => {
        setLoaded(true);
        console.log("habits error");
      },
      () => {
        setLoaded(true);
        console.log("habits success");
      }
    );
  }

  function addHabit(
    title: string,
    daysPerWeek: number,
    color: string,
    startDate: string
  ) {
    const UUID = Crypto.randomUUID();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into habits (id, title, days_per_week, color, start_date) values (?, ?, ?, ?, ?)",
        [UUID, title, daysPerWeek, color, startDate]
      );
      tx.executeSql(
        "select * from habits where id = ?",
        [UUID],
        (_, { rows: { _array } }) => habits.merge([..._array])
      );
    });
  }

  function updateHabit(
    id: string,
    title: string,
    daysPerWeek: number,
    color: string,
    startDate: string
  ) {
    db.transaction((tx) => {
      tx.executeSql(
        "update habits set title = ?, days_per_week = ?, color = ?, start_date = ? where id = ?",
        [title, daysPerWeek, color, startDate, id]
      );
      tx.executeSql(
        "select * from habits where id = ?",
        [id],
        (_, { rows: { _array } }) => {
          const index = habits.get().findIndex((habit) => {
            return habit.id === id;
          });
          if (index !== -1) {
            habits[index].set(_array[0]);
          }
        }
      );
    });
  }

  function deleteHabit(id: string) {
    db.transaction((tx) => {
      tx.executeSql("delete from habits where id = ?", [id]);
      tx.executeSql("delete from checks where habit_id = ?", [id]);

      const index = habits.get().findIndex((habit) => {
        return habit.id === id;
      });
      if (index !== -1) {
        habits[index].set(none);
      }
    });
  }

  return {
    habits,
    loaded,
    getHabits,
    addHabit,
    updateHabit,
    deleteHabit,
  };
};
