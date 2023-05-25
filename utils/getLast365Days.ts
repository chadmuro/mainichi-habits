import dayjs from "dayjs";

export function getLast365Days(today: dayjs.Dayjs) {
  const dates: string[] = [];
  const dayOfTheWeek = today.day();
  const previousDays = 365 - dayOfTheWeek + 1;

  for (let i = 0; i < previousDays; i++) {
    dates.unshift(today.subtract(i, "days").format("YYYY-MM-DD"));
  }

  for (let i = dayOfTheWeek; i < 6; i++) {
    dates.push(
      today
        .startOf("week")
        .add(i + 1, "days")
        .format("YYYY-MM-DD")
    );
  }

  return dates;
}
