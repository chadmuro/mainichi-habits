import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";
import TextInput from "../../../components/styled/TextInput";
import TextLabel from "../../../components/styled/TextLabel";
import TabLayout from "../../../components/TabLayout";
import { habitColors, theme } from "../../../theme";

export default function Add() {
  const [habit, setHabit] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [color, setColor] = useState<string | null>(null);

  function onColorChange(color: string) {
    setColor(color);
  }

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
              <TouchableOpacity onPress={() => onColorChange(habitColor)}>
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
});
