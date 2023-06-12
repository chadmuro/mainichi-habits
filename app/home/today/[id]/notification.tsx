import { Link, Stack, useRouter, useSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import TabLayout from "../../../../components/TabLayout";
import { theme } from "../../../../theme";
import Text from "../../../../components/styled/Text";
import { useHabitState } from "../../../../store/habits";
import TextLabel from "../../../../components/styled/TextLabel";
import { useState } from "react";
import { useTheme } from "../../../../contexts/themeContext";
import dayjs from "dayjs";
import { useNotifications } from "../../../../hooks/useNotifications";
import { Weekday } from "../../../../types";

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
  const { habits } = useHabitState();
  const { createNotification } = useNotifications();
  const habit = habits.get().find((habit) => habit.id === id);

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
    if (selectedDays.includes(dayVal)) {
      setSelectedDays((prev) => prev.filter((prevItem) => prevItem !== dayVal));
    } else {
      setSelectedDays((prev) => [...prev, dayVal]);
    }
  }

  async function onSavePress() {
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
          <TextLabel title="Notification time" />
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
          </View>
        </View>
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
