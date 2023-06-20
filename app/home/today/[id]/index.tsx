import { Stack, useSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, View, StyleSheet, Linking } from "react-native";
import Text from "../../../../components/styled/Text";
import TabLayout from "../../../../components/TabLayout";
import { useHabitState } from "../../../../store/habits";
import Button from "../../../../components/styled/Button";
import { useCheckState } from "../../../../store/checks";
import dayjs from "dayjs";
import { useMemo } from "react";
import { calculateStreak } from "../../../../utils/calculateStreak";
import YearGrid from "../../../../components/yearGrid";
import { useTheme } from "../../../../contexts/themeContext";
import { Habit } from "../../../../types";
import { useNotifications } from "../../../../hooks/useNotifications";

export default function Details() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useSearchParams();
  const { habits, deleteHabit } = useHabitState();
  const { requestPermissionsAsync } = useNotifications();
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

  async function onNotificationPress(habit: Habit) {
    const permission = await requestPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert(
        "Turn on notification permissions",
        "To use this feature, you must have permissions turned on.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
    router.push(`home/today/${habit.id}/notification`);
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
          <Button
            color={habit.color}
            icon="pencil-outline"
            onPress={() => router.push(`home/today/${habit.id}/edit`)}
          >
            Edit habit
          </Button>
          <Button
            color={habit.color}
            icon="today-outline"
            onPress={() => router.push(`home/today/${habit.id}/past`)}
          >
            Past dates
          </Button>
          <Button
            color={habit.color}
            icon="notifications-outline"
            onPress={() => onNotificationPress(habit)}
          >
            Reminder
          </Button>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
              Stats
            </Text>
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
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
              Last 365 days
            </Text>
            <YearGrid
              color={habit.color}
              checks={habitChecks}
              startDate={habit.start_date}
            />
          </View>
          <Button
            color={theme.colors.danger}
            icon="trash-outline"
            onPress={onDeletePress}
          >
            Delete
          </Button>
        </View>
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subTitle: {
    color: "#a5a5a5",
  },
});
