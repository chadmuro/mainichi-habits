import { Pressable, View } from "react-native";
import dayjs from "dayjs";
import { Calendar, DateData } from "react-native-calendars";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import TabLayout from "../../../../components/TabLayout";
import Text from "../../../../components/styled/Text";
import { adjustColor } from "../../../../utils/adjustColor";
import { useHabitState } from "../../../../store/habits";
import { useCheckState } from "../../../../store/checks";
import { useTheme } from "../../../../contexts/themeContext";

export default function Past() {
  const { theme, selectedTheme } = useTheme();
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
        <Calendar
          style={{ width: "100%" }}
          minDate={habit.start_date}
          maxDate={today}
          markedDates={markedDates}
          enableSwipeMonths={true}
          onDayPress={(day) => handleDayPress(day)}
          hideExtraDays={false}
          disableMonthChange={true}
          disableAllTouchEventsForInactiveDays={true}
          theme={{
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.background,
            textSectionTitleColor: theme.colors.text,
            // textSectionTitleDisabledColor: "red",
            selectedDayBackgroundColor: adjustColor(
              habit.color,
              selectedTheme === "dark" ? -100 : 100
            ),
            selectedDayTextColor: theme.colors.text,
            todayTextColor: habit.color,
            dayTextColor: theme.colors.text,
            textDisabledColor: adjustColor(
              theme.colors.background,
              selectedTheme === "dark" ? 50 : -50
            ),
            // dotColor: "#00adf5",
            // selectedDotColor:theme.colors.background,
            arrowColor: habit.color,
            // disabledArrowColor: "#d9e1e8",
            monthTextColor: habit.color,
            // indicatorColor: "blue",
            // textDayFontFamily: "monospace",
            // textMonthFontFamily: "monospace",
            // textDayHeaderFontFamily: "monospace",
            // textDayFontWeight: "300",
            // textMonthFontWeight: "bold",
            // textDayHeaderFontWeight: "300",
            textDayFontSize: 18,
            textMonthFontSize: 20,
            // textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </TabLayout>
  );
}
