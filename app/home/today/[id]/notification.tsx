import { Link, Stack, useSearchParams } from "expo-router";
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

type Day = { val: number; text: string };

const days: Day[] = [
  { val: 0, text: "Sun" },
  { val: 1, text: "Mon" },
  { val: 2, text: "Tue" },
  { val: 3, text: "Wed" },
  { val: 4, text: "Thu" },
  { val: 5, text: "Fri" },
  { val: 6, text: "Sat" },
];

export default function Notification() {
  const { id } = useSearchParams();
  const { theme, selectedTheme } = useTheme();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const { habits, updateHabit } = useHabitState();
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

  function onDaySelect(dayVal: number) {
    if (selectedDays.includes(dayVal)) {
      setSelectedDays((prev) => prev.filter((prevItem) => prevItem !== dayVal));
    } else {
      setSelectedDays((prev) => [...prev, dayVal]);
    }
  }

  console.log(selectedDays);

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
            <Pressable onPress={() => console.log("save")}>
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
