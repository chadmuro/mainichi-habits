import { View, StyleSheet, Pressable } from "react-native";
import { useMemo, useRef } from "react";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Habit, WeekStart } from "../../types";
import Text from "../styled/Text";
import { useCheckState } from "../../store/checks";
import { calculateStreak } from "../../utils/calculateStreak";
import DaysOfTheWeek from "./DaysOfTheWeek";
import { Link } from "expo-router";
import { checkDays } from "../../utils/checkDays";
import { useTheme } from "../../contexts/themeContext";
import {
  HabitColorTitle,
  HabitMainColor,
  habitMainColorMap,
} from "../../theme";
import { useSettingsState } from "../../store/settings";
import { useAskReview } from "../../hooks/useAskReview";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const animation = useRef<LottieView | null>(null);
  const { theme, selectedTheme } = useTheme();
  const { addCheck, deleteCheck, checks } = useCheckState();
  const today = dayjs().format("YYYY-MM-DD");
  const { settings } = useSettingsState();
  const { askReview } = useAskReview();

  const weekStart = settings.get()?.week_start;

  const habitChecks = checks.get().filter((check) => {
    return check.habit_id === habit.id;
  });
  const numHabitChecks = habitChecks.length;

  // TODO - Check if date has changed to reset habit card ui
  const checked = habitChecks.find((check) => {
    return check.date === today;
  });

  const completedColor =
    selectedTheme === "dark"
      ? theme.colors.habit[
          habitMainColorMap[habit.color as HabitMainColor] as HabitColorTitle
        ].dark
      : theme.colors.habit[
          habitMainColorMap[habit.color as HabitMainColor] as HabitColorTitle
        ].light;
  const streak = useMemo(() => {
    return calculateStreak({
      checks: habitChecks,
      daysPerWeek: habit.days_per_week,
      today,
    });
  }, [numHabitChecks, habit.days_per_week, weekStart]);

  const { checkedDays, days } = checkDays(habitChecks, weekStart as WeekStart);

  function onCheckPress() {
    // If midnight has passed, checking habit card will add new day check
    const checkedToday = dayjs().format("YYYY-MM-DD");
    if (checkedToday !== today) {
      addCheck(habit.id, checkedToday);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (checkedDays.length + 1 >= habit.days_per_week) {
        animation.current?.play();
        askReview();
      }
      return;
    }

    if (!checked) {
      addCheck(habit.id, today);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (checkedDays.length + 1 >= habit.days_per_week) {
        animation.current?.play();
        askReview();
      }
    } else {
      deleteCheck(checked.id);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }

  return (
    <Link
      href={`/home/today/${habit.id}`}
      style={[
        styles.container,
        {
          borderColor: checked ? completedColor : habit.color,
          backgroundColor: checked ? completedColor : undefined,
          padding: theme.spacing.m,
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
        <LottieView
          loop={false}
          ref={animation}
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            height: "100%",
            backgroundColor: "transparent",
          }}
          source={require("../../assets/lottie/celebration.json")}
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
  },
});
