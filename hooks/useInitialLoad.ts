import { useState, useEffect } from "react";
import { useCheckState } from "../store/checks";
import { useHabitState } from "../store/habits";

export function useInitialLoad() {
  const [appLoaded, setAppLoaded] = useState(false);
  const { getHabits, loaded: habitsLoaded } = useHabitState();
  const { getChecks, loaded: checksLoaded } = useCheckState();

  useEffect(() => {
    getHabits();
    getChecks();
  }, []);

  useEffect(() => {
    if (habitsLoaded && checksLoaded) {
      setAppLoaded(true);
    }
  }, [habitsLoaded, checksLoaded]);

  return { appLoaded };
}
