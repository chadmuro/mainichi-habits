import { View, StyleSheet, Pressable, Vibration } from "react-native";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { theme } from "../../theme";
import { Habit } from "../../types";
import Text from "../styled/Text";
import { useCheckState } from "../../store/checks";
import { adjustColor } from "../../utils/adjustColor";
import { calculateStreak } from "../../utils/calculateStreak";
import DaysOfTheWeek from "./DaysOfTheWeek";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const { addCheck, deleteCheck, checks } = useCheckState();
  const today = dayjs().format("YYYY-MM-DD");

  const habitChecks = checks.get().filter((check) => {
    return check.habit_id === habit.id;
  });
  const numHabitChecks = habitChecks.length;

  const checked = habitChecks.find((check) => {
    return check.date === today;
  });

  const completedColor = adjustColor(habit.color, -100);
  const streak = useMemo(() => {
    return calculateStreak({
      checks: habitChecks,
      daysPerWeek: habit.days_per_week,
      today,
    });
  }, [numHabitChecks]);

  function onCheckPress() {
    if (!checked) {
      addCheck(habit.id, today);
    } else {
      deleteCheck(checked.id);
    }
    Vibration.vibrate();
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: checked ? completedColor : habit.color,
          backgroundColor: checked ? completedColor : undefined,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: theme.spacing.xs,
          }}
        >
          <MaterialIcons
            name="local-fire-department"
            size={30}
            color={checked ? habit.color : theme.colors.text}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              paddingLeft: theme.spacing.s / 2,
            }}
          >
            {streak}
          </Text>
        </View>
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
      <Text style={{ fontSize: 16, paddingBottom: theme.spacing.xs }}>
        {habit.title}
      </Text>
      <Text
        style={{ paddingBottom: theme.spacing.s }}
      >{`Days per week goal: ${habit.days_per_week}`}</Text>
      <DaysOfTheWeek checks={habitChecks} color={completedColor} />
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
