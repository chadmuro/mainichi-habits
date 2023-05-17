import { View, StyleSheet } from "react-native";
import dayjs from "dayjs";
import Text from "../styled/Text";
import { theme } from "../../theme";
import { Check } from "../../types";

interface Props {
  checks: Check[];
  color: string;
}

function checkDayOfTheWeek(date: string, checks: Check[]) {
  const index = checks.findIndex((check) => check.date === date);
  if (index !== -1) return true;
  return false;
}

export default function DaysOfTheWeek({ checks, color }: Props) {
  const firstDay = dayjs().startOf("week");
  const sunday = firstDay.format("YYYY-MM-DD");
  const monday = firstDay.add(1, "day").format("YYYY-MM-DD");
  const tuesday = firstDay.add(2, "day").format("YYYY-MM-DD");
  const wednesday = firstDay.add(3, "day").format("YYYY-MM-DD");
  const thursday = firstDay.add(4, "day").format("YYYY-MM-DD");
  const friday = firstDay.add(5, "day").format("YYYY-MM-DD");
  const saturday = firstDay.add(6, "day").format("YYYY-MM-DD");

  const days = [
    { text: "S", date: sunday, checked: checkDayOfTheWeek(sunday, checks) },
    { text: "M", date: monday, checked: checkDayOfTheWeek(monday, checks) },
    { text: "T", date: tuesday, checked: checkDayOfTheWeek(tuesday, checks) },
    {
      text: "W",
      date: wednesday,
      checked: checkDayOfTheWeek(wednesday, checks),
    },
    { text: "T", date: thursday, checked: checkDayOfTheWeek(thursday, checks) },
    { text: "F", date: friday, checked: checkDayOfTheWeek(friday, checks) },
    { text: "S", date: saturday, checked: checkDayOfTheWeek(saturday, checks) },
  ];

  return (
    <View style={styles.daysContainer}>
      {days.map((day) => (
        <View
          key={day.date}
          style={[
            styles.dayContainer,
            {
              borderColor: theme.colors.text,
              backgroundColor: day.checked ? color : theme.colors.background,
            },
          ]}
        >
          <Text>{day.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: "row",
    gap: theme.spacing.s,
  },
  dayContainer: {
    padding: theme.spacing.s,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    minWidth: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
