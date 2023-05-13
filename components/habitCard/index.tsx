import { View, StyleSheet, Pressable, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Habit } from "../../types";
import Text from "../styled/Text";
import { useCheckState } from "../../store/checks";
import dayjs from "dayjs";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const { addCheck, deleteCheck, checks } = useCheckState();
  const today = dayjs().startOf("date").toISOString();

  const checked = checks.get().find((check) => {
    return check.habit_id === habit.id && check.date === today;
  });

  function onCheckPress() {
    if (!checked) {
      addCheck(habit.id, today);
    } else {
      deleteCheck(checked.id);
    }
    Vibration.vibrate();
  }

  return (
    <View style={[styles.container, { borderColor: habit.color }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Streak</Text>
        {checked ? (
          <Pressable onPress={onCheckPress}>
            <Ionicons name="checkmark-circle" size={30} color={habit.color} />
          </Pressable>
        ) : (
          <Pressable onPress={onCheckPress}>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color={habit.color}
            />
          </Pressable>
        )}
      </View>
      <Text>{habit.title}</Text>
      <Text>{`Days per week goal: ${habit.days_per_week}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "100%",
    padding: theme.spacing.m,
    borderRadius: 8,
  },
});
