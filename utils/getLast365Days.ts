import dayjs from "dayjs";
import { WeekStart } from "../types";

export function getLast365Days(today: dayjs.Dayjs, weekStart: WeekStart) {
  const dates: string[] = [];
  const dayOfTheWeek = today.day();
  const previousDays = 365 - 7 - weekStart + dayOfTheWeek;

  for (let i = 0; i < previousDays; i++) {
    dates.unshift(today.subtract(i, "days").format("YYYY-MM-DD"));
  }

  for (let i = dayOfTheWeek; i < 6 + weekStart; i++) {
    dates.push(
      today
        .startOf("week")
        .add(i + 1, "days")
        .format("YYYY-MM-DD")
    );
  }

  return dates;
}
