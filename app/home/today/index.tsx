import { useState, useEffect } from "react";
import { View } from "react-native";
import HabitCard from "../../../components/habitCard";
import Text from "../../../components/styled/Text";
import TabLayout from "../../../components/TabLayout";
import { useDatabase } from "../../../contexts/databaseContext";
import { Habit } from "../../../types";

export default function Today() {
  const { db } = useDatabase();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      console.log("get habits");
      tx.executeSql(`SELECT * FROM habits;`, [], (_, { rows: { _array } }) =>
        setHabits(_array)
      );
    });
  }, []);

  console.log(habits);

  return (
    <TabLayout>
      <View style={{ width: "100%" }}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </View>
    </TabLayout>
  );
}
