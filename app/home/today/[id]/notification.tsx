import { Link, Stack, useRouter, useGlobalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import TabLayout from "../../../../components/TabLayout";
import Text from "../../../../components/styled/Text";
import { useHabitState } from "../../../../store/habits";
import TextLabel from "../../../../components/styled/TextLabel";
import { useState } from "react";
import { useTheme } from "../../../../contexts/themeContext";
import Button from "../../../../components/styled/Button";
import { useNotifications } from "../../../../hooks/useNotifications";
import { Weekday, days, Day } from "../../../../types";
import { useNotificationState } from "../../../../store/notifications";
import TextError from "../../../../components/styled/TextError";
import { useSettingsState } from "../../../../store/settings";

export default function Notification() {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const { theme, selectedTheme } = useTheme();
  const [error, setError] = useState("");
  const { habits } = useHabitState();
  const { createNotification, deleteNotification, updateNotification } =
    useNotifications();
  const { notifications } = useNotificationState();
  const habit = habits.get().find((habit) => habit.id === id);
  const notificationData = notifications
    .get()
    .find((notif) => notif.habit_id === habit?.id);
  const defaultDays: Weekday[] = notificationData
    ? (notificationData.days.split(",").map((day) => Number(day)) as Weekday[])
    : [];
  const defaultDate = new Date();
  if (notificationData) {
    defaultDate.setHours(notificationData.hour, notificationData.minute, 0);
  }
  const [selectedDays, setSelectedDays] = useState<Weekday[]>(defaultDays);
  const [reminderTime, setReminderTime] = useState(defaultDate);
  const { settings } = useSettingsState();

  const weekStart = settings.get()?.week_start;

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    const selectedDate = date;
    setReminderTime(selectedDate);
  };

  function onDaySelect(dayVal: Weekday) {
    setError("");
    if (selectedDays.includes(dayVal)) {
      setSelectedDays((prev) => prev.filter((prevItem) => prevItem !== dayVal));
    } else {
      setSelectedDays((prev) => [...prev, dayVal]);
    }
  }

  function onDeletePress(notificationId: string, identifiers: string) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Are you sure you want to delete this reminder?",
      "Once deleted, the data cannot be retrieved.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          onPress: () => onDeleteSubmit(notificationId, identifiers),
          style: "destructive",
        },
      ]
    );
  }

  function onDeleteSubmit(notificationId: string, identifiers: string) {
    deleteNotification(notificationId, identifiers);
    if (habit) {
      router.push(`/home/today/${habit.id}`);
    }
  }

  async function onSavePress() {
    if (selectedDays.length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError("At least one day must be selected");
      return;
    }
    let weekday: Weekday[] | "daily" = [];
    const hour = reminderTime.getHours();
    const minute = reminderTime.getMinutes();
    weekday = [...selectedDays];

    if (notificationData) {
      if (habit) {
        await updateNotification(
          notificationData.id,
          habit.title,
          weekday.join(","),
          notificationData.identifiers,
          hour,
          minute
        );
        router.push(`/home/today/${habit.id}`);
        return;
      }
    }

    if (habit) {
      await createNotification(habit.id, habit.title, hour, minute, weekday);
      router.push(`/home/today/${habit.id}`);
    }
  }

  let displayDays = days;
  if (weekStart === 1 && displayDays[0].val === 1) {
    displayDays.push(displayDays.shift() as Day);
  } else if (weekStart === 0 && displayDays[0].val === 2) {
    displayDays.unshift(displayDays.pop() as Day);
  }

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href={`/home/today/${habit.id}`} asChild>
              <Pressable>
                <Text style={{ color: theme.colors.primary }}>Cancel</Text>
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Pressable onPress={() => onSavePress()}>
              <Text style={{ color: theme.colors.primary }}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <Text style={{ fontSize: 20 }}>{habit.title}</Text>
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Reminder time" />
          <DateTimePicker
            value={reminderTime}
            display="spinner"
            mode="time"
            locale="en"
            onChange={onDateChange}
            textColor={theme.colors.text}
            themeVariant={selectedTheme}
          />
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Days" />
          <View style={styles.buttonsContainer}>
            {displayDays.map((day) => (
              <TouchableOpacity
                key={day.val}
                onPress={() => onDaySelect(day.val)}
              >
                <View
                  style={[
                    styles.color,
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: selectedDays.includes(day.val)
                        ? theme.colors.primary
                        : theme.colors.background,
                      borderColor: selectedDays.includes(day.val)
                        ? theme.colors.primary
                        : theme.colors.text,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: selectedDays.includes(day.val)
                        ? theme.colors.background
                        : theme.colors.text,
                    }}
                  >
                    {day.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {error && <TextError title={error} />}
          </View>
        </View>
        {notificationData && (
          <View style={{ paddingTop: theme.spacing.m }}>
            <Button
              color={theme.colors.danger}
              icon="trash-outline"
              onPress={() =>
                onDeletePress(notificationData.id, notificationData.identifiers)
              }
            >
              Delete
            </Button>
          </View>
        )}
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  inputWrapper: {
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  color: {
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    borderWidth: 2,
  },
});
