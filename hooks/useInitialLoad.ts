import { useState, useEffect } from "react";
import { useCheckState } from "../store/checks";
import { useHabitState } from "../store/habits";
import { useSettingsState } from "../store/settings";

export function useInitialLoad() {
  const [appLoaded, setAppLoaded] = useState(false);
  const { getHabits, loaded: habitsLoaded } = useHabitState();
  const { getChecks, loaded: checksLoaded } = useCheckState();
  const { getSettings, loaded: settingsLoaded } = useSettingsState();

  useEffect(() => {
    getHabits();
    getChecks();
    getSettings();
  }, []);

  useEffect(() => {
    if (habitsLoaded && checksLoaded && settingsLoaded) {
      setAppLoaded(true);
    }
  }, [habitsLoaded, checksLoaded, settingsLoaded]);

  return { appLoaded };
}
