import dayjs from "dayjs";
import { Check } from "../types";

interface Props {
  checks: Check[];
  daysPerWeek: number;
  today: string;
}

export function calculateStreak({ checks, daysPerWeek, today }: Props) {
  console.log(checks, daysPerWeek, today);
  let interval: "days" | "weeks" = "weeks";
  if (daysPerWeek === 7) {
    // Calculate day streak
    interval = "days";
    const checked = checks.find((check) => {
      return check.date === today;
    });

    if (!checked) {
      return "0 days";
    }

    let streak = checkPreviousDay(checks, today);

    if (streak === 1) {
      return "1 day";
    } else {
      return `${streak} days`;
    }
  } else {
    // Calculate week streak
    interval = "weeks";
  }

  return "";
}

function checkPreviousDay(checks: Check[], day: string) {
  const prevDay = dayjs(day).subtract(1, "day").format("YYYY-MM-DD");
  let streak = 1;

  const checked = checks.find((check) => {
    return check.date === prevDay;
  });

  if (!checked) return streak;
  streak = streak + 1;

  if (checked) {
    streak = streak + 1;
    checkPreviousDay(checks, prevDay);
  }
  return streak;
}
