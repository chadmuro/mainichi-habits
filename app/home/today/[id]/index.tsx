import { Stack, useSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, View, StyleSheet } from "react-native";
import Text from "../../../../components/styled/Text";
import TabLayout from "../../../../components/TabLayout";
import { useHabitState } from "../../../../store/habits";
import { theme } from "../../../../theme";
import Button from "../../../../components/styled/Button";
import { useCheckState } from "../../../../store/checks";
import dayjs from "dayjs";
import { useMemo } from "react";
import { calculateStreak } from "../../../../utils/calculateStreak";

export default function Details() {
  const router = useRouter();
  const { id } = useSearchParams();
  const { habits, deleteHabit } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  const { checks } = useCheckState();
  const today = dayjs().format("YYYY-MM-DD");

  const habitChecks = checks.get().filter((check) => {
    return check.habit_id === habit.id;
  });
  const numHabitChecks = habitChecks.length;

  const streak = useMemo(() => {
    return calculateStreak({
      checks: habitChecks,
      daysPerWeek: habit.days_per_week,
      today,
    });
  }, [numHabitChecks, habit.days_per_week]);

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
              color={habit.color}
              icon="pencil-outline"
              onPress={() => router.push(`home/today/${habit.id}/edit`)}
            >
              Edit
            </Button>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Stats</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingRight: theme.spacing.m, gap: 5 }}>
                <Text style={styles.subTitle}>Days per week goal</Text>
                <Text style={styles.subTitle}>Start date</Text>
                <Text style={styles.subTitle}>Current streak</Text>
                <Text style={styles.subTitle}>Total days completed</Text>
              </View>
              <View style={{ gap: 5 }}>
                <Text>{String(habit.days_per_week)}</Text>
                <Text>{habit.start_date}</Text>
                <Text>{streak}</Text>
                <Text>{String(numHabitChecks)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Year chart</Text>
          </View>
          <View>
            <Button
              color={theme.colors.danger}
              icon="trash-outline"
              onPress={onDeletePress}
            >
              Delete
            </Button>
          </View>
        </View>
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.spacing.m,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: theme.spacing.s,
  },
  subTitle: {
    color: "#a5a5a5",
  },
});
