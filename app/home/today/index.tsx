import { useEffect } from "react";
import { View, ScrollView } from "react-native";
import Text from "../../../components/styled/Text";
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

  let habitCards: React.ReactElement | null = null;
  if (habits.get().length === 0) {
    habitCards = <Text style={{ margin: theme.spacing.m }}>No habits</Text>;
  } else {
    habitCards = (
      <>
        {habits.get().map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </>
    );
  }

  return (
    <TabLayout>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            gap: theme.spacing.m,
          }}
        >
          {habitCards}
        </View>
      </ScrollView>
    </TabLayout>
  );
}
