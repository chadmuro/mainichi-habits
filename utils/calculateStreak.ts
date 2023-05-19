import dayjs from "dayjs";
import { Check } from "../types";

interface Props {
  checks: Check[];
  daysPerWeek: number;
  today: string;
}

export function calculateStreak({ checks, daysPerWeek, today }: Props) {
  let interval: "days" | "weeks" = "weeks";
  if (daysPerWeek === 7) {
    // Calculate day streak
    interval = "days";

    let streak = checkPreviousDay(checks, today);

    // If today is checked, add one to streak
    const checked = checks.find((check) => {
      return check.date === today;
    });
    if (checked) {
      streak = streak + 1;
    }

    if (streak === 1) {
      return "1 day";
    } else {
      return `${streak} days`;
    }
  } else {
    // Calculate week streak
    interval = "weeks";

    const firstDay = dayjs().startOf("week");
    let streak = checkPreviousWeek(checks, firstDay, daysPerWeek);

    // If this week is checked, add one to streak
    const daysOfTheWeek = getDaysOfTheWeek(firstDay);
    const thisWeekChecks = checks.filter((check) => {
      return daysOfTheWeek.includes(check.date);
    });
    if (thisWeekChecks.length >= daysPerWeek) {
      streak = streak + 1;
    }

    if (streak === 1) {
      return "1 week";
    } else {
      return `${streak} weeks`;
    }
  }
}

function getDaysOfTheWeek(firstDay: dayjs.Dayjs) {
  const sunday = firstDay.format("YYYY-MM-DD");
  const monday = firstDay.add(1, "day").format("YYYY-MM-DD");
  const tuesday = firstDay.add(2, "day").format("YYYY-MM-DD");
  const wednesday = firstDay.add(3, "day").format("YYYY-MM-DD");
  const thursday = firstDay.add(4, "day").format("YYYY-MM-DD");
  const friday = firstDay.add(5, "day").format("YYYY-MM-DD");
  const saturday = firstDay.add(6, "day").format("YYYY-MM-DD");

  return [sunday, monday, tuesday, wednesday, thursday, friday, saturday];
}

function checkPreviousDay(
  checks: Check[],
  day: string,
  streak?: number
): number {
  let newStreak: number = streak || 0;
  // Check previous day match
  const prevDay = dayjs(day).subtract(1, "day").format("YYYY-MM-DD");
  const checked = checks.find((check) => {
    return check.date === prevDay;
  });

  // If NO, return new streak
  if (!checked) {
    return newStreak;
  }

  // If YES, return function with previous day
  newStreak = newStreak + 1;
  return checkPreviousDay(checks, prevDay, newStreak);
}

function checkPreviousWeek(
  checks: Check[],
  firstDay: dayjs.Dayjs,
  daysPerWeek: number,
  streak?: number
): number {
  let newStreak = streak || 0;
  // Check previous week days match days per week
  const prevWeek = firstDay.subtract(1, "week");
  const daysOfTheWeek = getDaysOfTheWeek(prevWeek);
  const thisWeekChecks = checks.filter((check) => {
    return daysOfTheWeek.includes(check.date);
  });

  // If NO, return new streak
  if (thisWeekChecks.length < daysPerWeek) {
    return newStreak;
  }

  // If YES, return function with previous week
  newStreak = newStreak + 1;
  return checkPreviousWeek(checks, prevWeek, daysPerWeek, newStreak);
}
