import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import TextInput from "../../../components/styled/TextInput";
import TextLabel from "../../../components/styled/TextLabel";
import TabLayout from "../../../components/TabLayout";
import { habitColors, theme } from "../../../theme";
import { useHabitState } from "../../../store/habits";

export default function Add() {
  const [habit, setHabit] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [startDate, setStartDate] = useState(dayjs().startOf("date").toDate());
  const [color, setColor] = useState<string | null>(null);
  const { addHabit } = useHabitState();

  function onColorChange(color: string) {
    setColor(color);
  }

  function onSubmit() {
    if (!color) return;
    addHabit(habit, Number(daysPerWeek), color, startDate);
  }

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    const selectedDate = date;
    setStartDate(selectedDate);
  };

  return (
    <TabLayout>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextLabel title="New habit" />
          <TextInput
            placeholder="New habit"
            value={habit}
            onChangeText={(habit: string) => setHabit(habit)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextLabel title="Start date" />
          <DateTimePicker
            value={startDate}
            display="spinner"
            mode="date"
            onChange={onDateChange}
            textColor={theme.colors.text}
            maximumDate={new Date()}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextLabel title="Days per week" />
          <TextInput
            placeholder="Days per week"
            inputMode="numeric"
            value={daysPerWeek}
            onChangeText={(daysPerWeek: string) => setDaysPerWeek(daysPerWeek)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextLabel title="Color" />
          <View style={styles.colorContainer}>
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
        <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: theme.spacing.m,
  },
  colorContainer: {
    flexDirection: "row",
    gap: 10,
  },
  color: {
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    borderWidth: 2,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 18,
  },
});
