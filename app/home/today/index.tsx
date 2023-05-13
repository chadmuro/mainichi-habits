import { useEffect } from "react";
import { View } from "react-native";
import HabitCard from "../../../components/habitCard";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { theme } from "../../../theme";
import { useCheckState } from "../../../store/checks";

export default function Today() {
  const { getHabits, habits } = useHabitState();
  const { getChecks } = useCheckState();

  useEffect(() => {
    getHabits();
    getChecks();
  }, []);

  return (
    <TabLayout>
      <View style={{ width: "100%", gap: theme.spacing.m }}>
        {habits.get().map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </View>
    </TabLayout>
  );
}
