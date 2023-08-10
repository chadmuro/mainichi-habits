import dayjs from "dayjs";

export function getLast365Days(today: string) {
  const dates: string[] = [];
  const dayJsDay = dayjs(today);
  const dayOfTheWeek = dayJsDay.weekday();
  const previousDays = 365 - 7 + dayOfTheWeek;

  for (let i = 0; i < previousDays; i++) {
    dates.unshift(dayJsDay.subtract(i, "days").format("YYYY-MM-DD"));
  }

  for (let i = dayOfTheWeek; i < 6; i++) {
    dates.push(
      dayJsDay
        .startOf("week")
        .add(i + 1, "days")
        .format("YYYY-MM-DD")
    );
  }

  return dates;
}
