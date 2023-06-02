import { useState, useEffect } from "react";
import { useCheckState } from "../store/checks";
import { useHabitState } from "../store/habits";
import { useSettingsState } from "../store/settings";

export function useInitialLoad() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const { getHabits, loaded: habitsLoaded } = useHabitState();
  const { getChecks, loaded: checksLoaded } = useCheckState();
  const { getSettings, loaded: settingsLoaded } = useSettingsState();

  function refreshData() {
    setRefreshing(true);
    getHabits();
    getChecks();
    getSettings();
  }

  useEffect(() => {
    getHabits();
    getChecks();
    getSettings();
  }, []);

  useEffect(() => {
    if (habitsLoaded && checksLoaded && settingsLoaded) {
      setAppLoaded(true);
      setRefreshing(false);
    }
  }, [habitsLoaded, checksLoaded, settingsLoaded]);

  return { appLoaded, refreshData, refreshing };
}
