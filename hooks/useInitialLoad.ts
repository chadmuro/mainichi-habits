import { useState, useEffect } from "react";
import { useCheckState } from "../store/checks";
import { useHabitState } from "../store/habits";
import { useSettingsState } from "../store/settings";
import { useNotificationState } from "../store/notifications";

export function useInitialLoad() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const { getHabits, loaded: habitsLoaded } = useHabitState();
  const { getChecks, loaded: checksLoaded } = useCheckState();
  const { getSettings, loaded: settingsLoaded } = useSettingsState();
  const { getNotifications, loaded: notificationsLoaded } =
    useNotificationState();

  function refreshData() {
    setRefreshing(true);
    getHabits();
    getChecks();
    getSettings();
    getNotifications();
  }

  useEffect(() => {
    getHabits();
    getChecks();
    getSettings();
    getNotifications();
  }, []);

  useEffect(() => {
    if (habitsLoaded && checksLoaded && settingsLoaded && notificationsLoaded) {
      setAppLoaded(true);
      setRefreshing(false);
    }
  }, [habitsLoaded, checksLoaded, settingsLoaded, notificationsLoaded]);

  return { appLoaded, refreshData, refreshing };
}
