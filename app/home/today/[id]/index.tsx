import { Link, Stack, useSearchParams } from "expo-router";
import { ScrollView, View, Button } from "react-native";
import Text from "../../../../components/styled/Text";
import TabLayout from "../../../../components/TabLayout";
import { useHabitState } from "../../../../store/habits";
import { theme } from "../../../../theme";

export default function Details() {
  const { id } = useSearchParams();
  const { habits } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }
  return (
    <TabLayout>
      <Stack.Screen
        options={{
          title: habit.title,
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
          <View>
            <Link href={`home/today/${habit.id}/edit`} asChild>
              <Button title="Edit" />
            </Link>
          </View>
          <View>
            <Text>Stats</Text>
          </View>
          <View>
            <Text>Year Chart</Text>
          </View>
        </View>
      </ScrollView>
    </TabLayout>
  );
}
