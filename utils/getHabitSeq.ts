import { Habit } from "../types";

export function getHabitSeq(habits: Habit[]) {
  const seqHabits = habits.map((habit, index) => {
    return {
      ...habit,
      seq: index + 1,
    };
  });

  return seqHabits;
}
