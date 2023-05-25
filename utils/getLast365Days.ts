import dayjs from "dayjs";

const TOTAL_DAYS = 365;

export function getLast365Days(today: dayjs.Dayjs) {
  const dates: string[] = [];

  for (let i = 0; i < TOTAL_DAYS; i++) {
    dates.unshift(today.subtract(i, "days").format("YYYY-MM-DD"));
  }

  return dates;
}
