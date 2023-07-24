import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import TabLayout from "../../../components/TabLayout";
import { useTheme } from "../../../contexts/themeContext";
import Text from "../../../components/styled/Text";
import YearGrid from "../../../components/yearGrid";
import { useCheckState } from "../../../store/checks";
import { Check } from "../../../types";
import { useHabitState } from "../../../store/habits";
import { useRouter } from "expo-router";

export default function Year() {
  const { theme } = useTheme();
  const router = useRouter();
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
        {habits.get().map((habit) => {
          const checkData = Object.entries(results).find(([key, value]) => {
            return habit.id === key;
          });
          return (
            <Pressable
              onPress={() => router.push(`/home/year/${habit.id}`)}
              key={habit.id}
              style={[
                styles.container,
                {
                  borderColor: theme.colors.text,
                  padding: theme.spacing.m,
                },
              ]}
            >
              <>
                <Text
                  style={[styles.title, { paddingBottom: theme.spacing.s }]}
                >
                  {habit.title}
                </Text>
                <YearGrid
                  color={habit.color}
                  checks={checkData ? checkData[1] : []}
                  startDate={habit.start_date}
                />
              </>
            </Pressable>
          );
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
