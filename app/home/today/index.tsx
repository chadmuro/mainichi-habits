import { View, ScrollView, RefreshControl } from "react-native";
import Text from "../../../components/styled/Text";
import HabitCard from "../../../components/habitCard";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { useInitialLoad } from "../../../hooks/useInitialLoad";
import { useTheme } from "../../../contexts/themeContext";

export default function Today() {
  const { theme } = useTheme();
  const { habits } = useHabitState();
  const { appLoaded, refreshing, refreshData } = useInitialLoad();

  // TODO implemenet logic to keep splash screen visibile while data is fetching
  // https://github.com/expo/expo/issues/21662
  if (!appLoaded) {
    return (
      <TabLayout>
        <View></View>
      </TabLayout>
    );
  }

  let habitCards: React.ReactElement | null = null;
  if (habits.get().length === 0) {
    habitCards = (
      <View style={{ margin: theme.spacing.m }}>
        <Text style={theme.textVariants.header}>
          Welcome to Mainichi Habits!
        </Text>
        <Text
          style={[theme.textVariants.body, { paddingTop: theme.spacing.m }]}
        >
          Add your first habit to get started
        </Text>
      </View>
    );
  } else {
    habitCards = (
      <>
        {habits.get().map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </>
    );
  }

  return (
    <TabLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            gap: theme.spacing.m,
          }}
        >
          {habitCards}
        </View>
      </ScrollView>
    </TabLayout>
  );
}
