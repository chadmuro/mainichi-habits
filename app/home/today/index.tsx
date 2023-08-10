import { View, ScrollView, RefreshControl, AppState } from "react-native";
import { SplashScreen } from "expo-router";
import * as Notifications from "expo-notifications";
import dayjs from "dayjs";
import Text from "../../../components/styled/Text";
import HabitCard from "../../../components/habitCard";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { useInitialLoad } from "../../../hooks/useInitialLoad";
import { useTheme } from "../../../contexts/themeContext";
import { useCallback, useEffect, useRef } from "react";
import { useSettingsState } from "../../../store/settings";
import { useDates } from "../../../contexts/datesContext";

export default function Today() {
  const { theme } = useTheme();
  const { habits } = useHabitState();
  const { appLoaded, refreshing, refreshData } = useInitialLoad();
  const appState = useRef(AppState.currentState);
  const { settings, updateSettings } = useSettingsState();
  const { setTodayFormatted } = useDates();

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    // Add event listener to check date when app comes into forground. If past midnight, update datesContext dates
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const checkDate = dayjs().format("YYYY-MM-DD");
        // If past midnight, update last_login, update year grid days and rerender habit cards
        if (settings.get()?.last_login !== checkDate) {
          setTodayFormatted(checkDate);
          updateSettings("last_login", checkDate);
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appLoaded) {
      Notifications.dismissAllNotificationsAsync();
      SplashScreen.hideAsync();
      const loginDate = dayjs().format("YYYY-MM-DD");
      // On app open, update last_login date if needed
      if (settings.get()?.last_login !== loginDate) {
        updateSettings("last_login", loginDate);
      }
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
