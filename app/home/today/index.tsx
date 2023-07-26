import { View, ScrollView, RefreshControl } from "react-native";
import { SplashScreen } from "expo-router";
import Text from "../../../components/styled/Text";
import HabitCard from "../../../components/habitCard";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { useInitialLoad } from "../../../hooks/useInitialLoad";
import { useTheme } from "../../../contexts/themeContext";
import { useCallback } from "react";

export default function Today() {
  const { theme } = useTheme();
  const { habits } = useHabitState();
  const { appLoaded, refreshing, refreshData } = useInitialLoad();

  SplashScreen.preventAutoHideAsync();

  const onLayoutRootView = useCallback(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  if (!appLoaded) {
    return null;
  }

  let habitCards: React.ReactElement | null = null;
  if (habits.get().length === 0) {
    habitCards = (
      <View style={{ margin: theme.spacing.m }}>
        <Text style={theme.textVariants.header}>
          <>
            Welcome to{" "}
            <Text style={{ color: theme.colors.habit.blue.main }}>
              Mainichi
            </Text>{" "}
            Habits!
          </>
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
    <TabLayout onLayout={onLayoutRootView}>
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
