import { Link, Stack, useRouter, useSearchParams } from "expo-router";
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
import { Weekday } from "../../../../types";
import { useNotificationState } from "../../../../store/notifications";
import TextError from "../../../../components/styled/TextError";

type Day = { val: Weekday; text: string };

const days: Day[] = [
  { val: 1, text: "Sun" },
  { val: 2, text: "Mon" },
  { val: 3, text: "Tue" },
  { val: 4, text: "Wed" },
  { val: 5, text: "Thu" },
  { val: 6, text: "Fri" },
  { val: 7, text: "Sat" },
];

export default function Notification() {
  const { id } = useSearchParams();
  const router = useRouter();
  const { theme, selectedTheme } = useTheme();
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState("");
  const { habits } = useHabitState();
  const { createNotification, deleteNotification } = useNotifications();
  const { notifications } = useNotificationState();
  const habit = habits.get().find((habit) => habit.id === id);
  const notificationData = notifications
    .get()
    .find((notif) => notif.habit_id === habit?.id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    const selectedDate = date;
    setStartDate(selectedDate);
  };

  function onDaySelect(dayVal: Weekday) {
    setError("");
    if (selectedDays.includes(dayVal)) {
      setSelectedDays((prev) => prev.filter((prevItem) => prevItem !== dayVal));
    } else {
      setSelectedDays((prev) => [...prev, dayVal]);
    }
  }

  console.log(notificationData);

  function onDeletePress(notificationId: string, identifiers: string) {
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
    console.log("delete notif");
    deleteNotification(notificationId, identifiers);
  }

  async function onSavePress() {
    if (selectedDays.length === 0) {
      setError("At least one day must be selected");
      return;
    }
    let weekday: Weekday[] | "daily" = [];
    const hour = startDate.getHours();
    const minute = startDate.getMinutes();
    if (selectedDays.length === 7) {
      weekday = "daily";
    } else {
      weekday = [...selectedDays];
    }

    if (habit) {
      await createNotification(habit.id, habit.title, hour, minute, weekday);
      router.push(`home/today/${habit.id}`);
    }
  }

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href={`home/today/${habit.id}`} asChild>
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
      <ScrollView style={styles.container}>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <Text style={{ fontSize: 20 }}>{habit.title}</Text>
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Reminder time" />
          <DateTimePicker
            value={startDate}
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
            {days.map((day) => (
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
    gap: 10,
    flexWrap: "wrap",
  },
  color: {
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    borderWidth: 2,
  },
});
