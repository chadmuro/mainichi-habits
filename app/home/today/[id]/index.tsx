import { Link, Stack, useSearchParams } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import Text from "../../../../components/styled/Text";
import TabLayout from "../../../../components/TabLayout";
import { useHabitState } from "../../../../store/habits";
import { theme } from "../../../../theme";
import Button from "../../../../components/styled/Button";

export default function Details() {
  const { id } = useSearchParams();
  const { habits } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function onDeleteSubmit() {
    console.log("deleted");
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
            paddingVertical: theme.spacing.m,
            paddingHorizontal: theme.spacing.s,
            gap: theme.spacing.m,
          }}
        >
          <View>
            <Link href={`home/today/${habit.id}/edit`} asChild>
              <Button color="primary" icon="pencil-outline">
                Edit
              </Button>
            </Link>
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
