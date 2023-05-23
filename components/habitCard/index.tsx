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
import { Link } from "expo-router";
import { checkDays } from "../../utils/checkDays";

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
  }, [numHabitChecks, habit.days_per_week]);

  const { checkedDays, days } = checkDays(habitChecks);

  function onCheckPress() {
    if (!checked) {
      addCheck(habit.id, today);
    } else {
      deleteCheck(checked.id);
    }
    Vibration.vibrate();
  }

  return (
    <Link
      href={`home/today/${habit.id}`}
      style={[
        styles.container,
        {
          borderColor: checked ? completedColor : habit.color,
          backgroundColor: checked ? completedColor : undefined,
        },
      ]}
      asChild
    >
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: theme.spacing.s,
          }}
        >
          <View
            style={{
              paddingBottom: theme.spacing.xs,
              width: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: theme.spacing.s,
                width: "100%",
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 18, flex: 1 }}>{habit.title}</Text>
              <Text
                style={{}}
              >{`Goal: ${checkedDays.length} / ${habit.days_per_week}`}</Text>
            </View>
          </View>
          {checked ? (
            <Pressable onPress={onCheckPress}>
              <Ionicons
                name="checkmark-circle"
                size={60}
                color={habit.color}
                style={{
                  position: "absolute",
                  left: -50,
                  top: -5,
                }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={onCheckPress}>
              <Ionicons
                name="checkmark-circle-outline"
                size={60}
                color={habit.color}
                style={{ position: "absolute", left: -50, top: -5 }}
              />
            </Pressable>
          )}
        </View>
        <DaysOfTheWeek days={days} color={completedColor} />
      </Pressable>
    </Link>
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
