import { View, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { Habit } from "../../types";
import Text from "../styled/Text";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Streak</Text>
        <Text>Check</Text>
      </View>
      <Text>{habit.title}</Text>
      <Text>{`Days per week goal: ${habit.days_per_week}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    width: "100%",
    padding: theme.spacing.m,
    borderRadius: 8,
  },
});
