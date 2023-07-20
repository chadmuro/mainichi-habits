import { Pressable, View } from "react-native";
import dayjs from "dayjs";
import { DateData } from "react-native-calendars";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import TabLayout from "../../../../components/TabLayout";
import Text from "../../../../components/styled/Text";
import { useHabitState } from "../../../../store/habits";
import { useCheckState } from "../../../../store/checks";
import { useTheme } from "../../../../contexts/themeContext";
import PastDatesCalendar from "../../../../components/PastDatesCalendar";

export default function Past() {
  const { theme } = useTheme();
  const { habits } = useHabitState();
  const { checks, addCheck, deleteCheck } = useCheckState();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const habit = habits.get().find((habit) => habit.id === id);
  const today = dayjs().format("YYYY-MM-DD");

  const habitChecks = checks.get().filter((check) => check.habit_id === id);
  const markedDates: any = {};
  habitChecks.forEach((habitCheck) => {
    markedDates[habitCheck.date] = { selected: true };
  });

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function handleDayPress(day: DateData) {
    const selectedCheck = habitChecks.find(
      (habitCheck) => habitCheck.date === day.dateString
    );
    if (habit) {
      if (selectedCheck) {
        deleteCheck(selectedCheck.id);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        addCheck(habit?.id, day.dateString);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  }

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          title: habit.title,
          headerRight: () => (
            <Link href={`/home/today/${habit.id}`} asChild>
              <Pressable>
                <Text style={{ color: theme.colors.primary }}>Done</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Text style={{ paddingBottom: theme.spacing.m }}>
        Select day to add or remove past dates
      </Text>
      <View style={{ width: "100%" }}>
        <PastDatesCalendar
          habit={habit}
          markedDates={markedDates}
          today={today}
          handleDayPress={handleDayPress}
        />
      </View>
    </TabLayout>
  );
}
