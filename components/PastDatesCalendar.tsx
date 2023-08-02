import { Calendar, DateData } from "react-native-calendars";
import { Habit } from "../types";
import { useTheme } from "../contexts/themeContext";
import { HabitColorTitle, HabitMainColor, habitMainColorMap } from "../theme";
import { useSettingsState } from "../store/settings";

interface Props {
  habit: Habit;
  markedDates: any;
  today: string;
  handleDayPress: (day: DateData) => void;
}
export default function PastDatesCalendar({
  habit,
  markedDates,
  today,
  handleDayPress,
}: Props) {
  const { theme, selectedTheme } = useTheme();
  const { settings } = useSettingsState();

  const weekStart = settings.get()?.week_start;

  return (
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
      firstDay={weekStart}
      theme={{
        backgroundColor: theme.colors.background,
        calendarBackground: theme.colors.background,
        textSectionTitleColor: theme.colors.text,
        // textSectionTitleDisabledColor: "red",
        selectedDayBackgroundColor:
          selectedTheme === "dark"
            ? theme.colors.habit[
                habitMainColorMap[
                  habit.color as HabitMainColor
                ] as HabitColorTitle
              ].dark
            : theme.colors.habit[
                habitMainColorMap[
                  habit.color as HabitMainColor
                ] as HabitColorTitle
              ].light,
        selectedDayTextColor: theme.colors.text,
        todayTextColor: habit.color,
        dayTextColor: theme.colors.text,
        textDisabledColor: theme.colors.foreground,
        // dotColor: "#00adf5",
        // selectedDotColor:theme.colors.background,
        arrowColor: habit.color,
        // disabledArrowColor: "#d9e1e8",
        monthTextColor: theme.colors.text,
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
  );
}
