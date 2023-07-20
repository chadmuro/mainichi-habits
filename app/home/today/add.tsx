import {
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Link, Stack, useRouter } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import TextInput from "../../../components/styled/TextInput";
import TextLabel from "../../../components/styled/TextLabel";
import TabLayout from "../../../components/TabLayout";
import { habitColors } from "../../../theme";
import Text from "../../../components/styled/Text";
import { useHabitState } from "../../../store/habits";
import TextError from "../../../components/styled/TextError";
import { useTheme } from "../../../contexts/themeContext";

const days = [1, 2, 3, 4, 5, 6, 7];

export default function Add() {
  const { theme, selectedTheme } = useTheme();
  const router = useRouter();
  const [habit, setHabit] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [startDate, setStartDate] = useState(dayjs().startOf("date").toDate());
  const [color, setColor] = useState(theme.colors.habit.red.main);
  const [error, setError] = useState("");
  const { addHabit } = useHabitState();

  function onColorChange(color: string) {
    setColor(color);
  }

  function onDaysChange(day: number) {
    setDaysPerWeek(day);
  }

  function onSubmit() {
    if (!habit) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return setError("Habit name is required");
    }
    addHabit(habit, daysPerWeek, color, dayjs(startDate).format("YYYY-MM-DD"));
    router.push("/home/today");
  }

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    const selectedDate = date;
    setStartDate(selectedDate);
  };

  return (
    <TabLayout>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href="/home/today" asChild>
              <Pressable>
                <Text style={{ color: theme.colors.primary }}>Cancel</Text>
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Pressable onPress={onSubmit}>
              <Text style={{ color: theme.colors.primary }}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Habit title" />
          <TextInput
            placeholder="Habit title"
            value={habit}
            onChangeText={(habit: string) => {
              if (habit) setError("");
              setHabit(habit);
            }}
          />
          {error && <TextError title={error} />}
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Start date" />
          <DateTimePicker
            value={startDate}
            display="spinner"
            mode="date"
            locale="en"
            onChange={onDateChange}
            textColor={theme.colors.text}
            maximumDate={new Date()}
            themeVariant={selectedTheme}
          />
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Days per week" />
          <View style={styles.buttonsContainer}>
            {days.map((day) => (
              <TouchableOpacity key={day} onPress={() => onDaysChange(day)}>
                <View
                  style={[
                    styles.color,
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        daysPerWeek === day
                          ? theme.colors.primary
                          : theme.colors.background,
                      borderColor:
                        daysPerWeek === day
                          ? theme.colors.primary
                          : theme.colors.text,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        daysPerWeek === day
                          ? theme.colors.background
                          : theme.colors.text,
                    }}
                  >
                    {String(day)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.inputWrapper, { marginBottom: theme.spacing.m }]}>
          <TextLabel title="Color" />
          <View style={styles.buttonsContainer}>
            {Object.entries(habitColors).map(([title, habitColor]) => (
              <TouchableOpacity
                key={title}
                onPress={() => onColorChange(habitColor.main)}
              >
                <View
                  style={[
                    styles.color,
                    {
                      backgroundColor: habitColor.main,
                      borderColor:
                        habitColor.main === color
                          ? theme.colors.text
                          : habitColor.main,
                    },
                  ]}
                />
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
