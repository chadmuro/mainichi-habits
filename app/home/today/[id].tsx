import { Stack, useSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import Text from "../../../components/styled/Text";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { theme } from "../../../theme";

export default function Details() {
  const { id } = useSearchParams();
  const { habits } = useHabitState();
  const habitData = habits.get().find((habit) => habit.id === id);

  let habitComponent: React.ReactElement | null = null;
  if (!habitData) {
    habitComponent = (
      <Text style={{ margin: theme.spacing.m }}>No habit data</Text>
    );
  } else {
    habitComponent = (
      <>
        <View>
          <Text>Edit Button</Text>
        </View>
        <View>
          <Text>Stats</Text>
        </View>
        <View>
          <Text>Year Chart</Text>
        </View>
      </>
    );
  }

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          title: habitData?.title || "Habit",
        }}
      />
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingVertical: theme.spacing.m,
            paddingHorizontal: theme.spacing.s,
            gap: theme.spacing.m,
          }}
        >
          {habitComponent}
        </View>
      </ScrollView>
    </TabLayout>
  );
}
