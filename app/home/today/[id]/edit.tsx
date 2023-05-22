import { Link, Stack, useSearchParams } from "expo-router";
import TabLayout from "../../../../components/TabLayout";
import Text from "../../../../components/styled/Text";
import { Pressable } from "react-native";
import { theme } from "../../../../theme";
import { useHabitState } from "../../../../store/habits";

export default function Edit() {
  const { id } = useSearchParams();
  const { habits } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function onSubmit() {
    console.log("submit");
  }

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href={`home/today/${habit.id}`} asChild>
              <Pressable>
                <Text style={{ color: theme.colors.primary }}>Cancel</Text>
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Pressable onPress={onSubmit}>
              <Text style={{ color: theme.colors.primary }}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <Text>{habit.title}</Text>
    </TabLayout>
  );
}
