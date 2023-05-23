import { View, StyleSheet } from "react-native";
import Text from "../styled/Text";
import { theme } from "../../theme";
import { CheckDay } from "../../utils/checkDays";

interface Props {
  days: CheckDay[];
  color: string;
}

export default function DaysOfTheWeek({ days, color }: Props) {
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
