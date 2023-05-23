import { Stack, useSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import Text from "../../../../components/styled/Text";
import TabLayout from "../../../../components/TabLayout";
import { useHabitState } from "../../../../store/habits";
import { theme } from "../../../../theme";
import Button from "../../../../components/styled/Button";

export default function Details() {
  const router = useRouter();
  const { id } = useSearchParams();
  const { habits, deleteHabit } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function onDeleteSubmit() {
    if (habit) {
      deleteHabit(habit.id);
    }
    router.back();
  }

  function onDeletePress() {
    Alert.alert(
      "Are you sure you want to delete this habit?",
      "Once deleted, the data cannot be retrieved.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          onPress: onDeleteSubmit,
          style: "destructive",
        },
      ]
    );
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
            gap: theme.spacing.m,
          }}
        >
          <View>
            <Button
              color="primary"
              icon="pencil-outline"
              onPress={() => router.push(`home/today/${habit.id}/edit`)}
            >
              Edit
            </Button>
          </View>
          <View>
            <Text>Stats</Text>
          </View>
          <View>
            <Text>Year Chart</Text>
          </View>
          <View>
            <Button color="danger" icon="trash-outline" onPress={onDeletePress}>
              Delete
            </Button>
          </View>
        </View>
      </ScrollView>
    </TabLayout>
  );
}
