import { ScrollView, View, StyleSheet } from "react-native";
import TabLayout from "../../../components/TabLayout";
import { useTheme } from "../../../contexts/themeContext";
import Text from "../../../components/styled/Text";
import YearGrid from "../../../components/yearGrid";
import { useCheckState } from "../../../store/checks";
import { Check } from "../../../types";
import { useHabitState } from "../../../store/habits";

export default function Year() {
  const { theme } = useTheme();
  const { checks } = useCheckState();
  const { habits } = useHabitState();

  const results = checks.get().reduce<{
    [index: string]: Check[];
  }>(function (results, check) {
    (results[check.habit_id] = results[check.habit_id] || []).push(check);
    return results;
  }, {});

  let yearCards: React.ReactElement | null = null;
  if (habits.get().length === 0) {
    yearCards = (
      <View style={{ margin: theme.spacing.m }}>
        <Text style={[theme.textVariants.body]}>No habits</Text>
      </View>
    );
  } else {
    yearCards = (
      <>
        {Object.entries(results).map(([key, value]) => {
          const habitData = habits.get().find((habit) => habit.id === key);
          if (habitData) {
            return (
              <View
                key={habitData.id}
                style={[
                  styles.container,
                  {
                    borderColor: theme.colors.text,
                    padding: theme.spacing.m,
                  },
                ]}
              >
                <Text
                  style={[styles.title, { paddingBottom: theme.spacing.s }]}
                >
                  {habitData.title}
                </Text>
                <YearGrid
                  color={habitData.color}
                  checks={value}
                  startDate={habitData.start_date}
                />
              </View>
            );
          }
        })}
      </>
    );
  }

  return (
    <TabLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            gap: theme.spacing.m,
          }}
        >
          {yearCards}
        </View>
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
