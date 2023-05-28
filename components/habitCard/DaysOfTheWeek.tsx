import { View, StyleSheet } from "react-native";
import Text from "../styled/Text";
import { CheckDay } from "../../utils/checkDays";
import { useTheme } from "../../contexts/themeContext";

interface Props {
  days: CheckDay[];
  color: string;
}

export default function DaysOfTheWeek({ days, color }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.daysContainer, { gap: theme.spacing.s }]}>
      {days.map((day) => (
        <View
          key={day.date}
          style={[
            styles.dayContainer,
            {
              borderColor: theme.colors.text,
              backgroundColor: day.checked ? color : theme.colors.background,
              padding: theme.spacing.s,
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
  },
  dayContainer: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    minWidth: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
