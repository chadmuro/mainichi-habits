import {
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Link, Stack, useRouter, useSearchParams } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import TabLayout from "../../../../components/TabLayout";
import Text from "../../../../components/styled/Text";
import { habitColors } from "../../../../theme";
import { useHabitState } from "../../../../store/habits";
import TextLabel from "../../../../components/styled/TextLabel";
import TextInput from "../../../../components/styled/TextInput";
import TextError from "../../../../components/styled/TextError";
import { useTheme } from "../../../../contexts/themeContext";

const days = [1, 2, 3, 4, 5, 6, 7];

export default function Edit() {
  const { theme, selectedTheme } = useTheme();
  const router = useRouter();
  const { id } = useSearchParams();
  const { habits, updateHabit } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  const [habitTitle, setHabitTitle] = useState(habit?.title ?? "");
  const [daysPerWeek, setDaysPerWeek] = useState(habit?.days_per_week ?? 1);
  const [startDate, setStartDate] = useState(dayjs(habit?.start_date).toDate());
  const [color, setColor] = useState(habit?.color ?? "#FFABAB");
  const [error, setError] = useState("");

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function onColorChange(color: string) {
    setColor(color);
  }

  function onDaysChange(day: number) {
    setDaysPerWeek(day);
  }

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    const selectedDate = date;
    setStartDate(selectedDate);
  };

  function onSubmit() {
    if (!habitTitle) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return setError("Habit name is required");
    }
    if (habit) {
      updateHabit(
        habit.id,
        habitTitle,
        daysPerWeek,
        color,
        dayjs(startDate).format("YYYY-MM-DD")
      );
      router.push(`/home/today/${habit.id}`);
    }
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
            value={habitTitle}
            onChangeText={(habit: string) => {
              if (habit) setError("");
              setHabitTitle(habit);
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
            {Object.values(habitColors).map((habitColor) => (
              <TouchableOpacity
                key={habitColor}
                onPress={() => onColorChange(habitColor)}
              >
                <View
                  style={[
                    styles.color,
                    {
                      backgroundColor: habitColor,
                      borderColor:
                        habitColor === color
                          ? theme.colors.primary
                          : habitColor,
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
