import dayjs from "dayjs";
import { Check, WeekStart } from "../types";

export type CheckDay = {
  text: string;
  date: string;
  checked: boolean;
};

function checkDayOfTheWeek(date: string, checks: Check[]) {
  const index = checks.findIndex((check) => check.date === date);
  if (index !== -1) return true;
  return false;
}

export function checkDays(checks: Check[], weekStart: WeekStart) {
  if (weekStart === 1) {
    const firstDay = dayjs().startOf("week");
    const monday = firstDay.format("YYYY-MM-DD");
    const tuesday = firstDay.add(1, "day").format("YYYY-MM-DD");
    const wednesday = firstDay.add(2, "day").format("YYYY-MM-DD");
    const thursday = firstDay.add(3, "day").format("YYYY-MM-DD");
    const friday = firstDay.add(4, "day").format("YYYY-MM-DD");
    const saturday = firstDay.add(5, "day").format("YYYY-MM-DD");
    const sunday = firstDay.add(6, "day").format("YYYY-MM-DD");

    const days: CheckDay[] = [
      { text: "M", date: monday, checked: checkDayOfTheWeek(monday, checks) },
      { text: "T", date: tuesday, checked: checkDayOfTheWeek(tuesday, checks) },
      {
        text: "W",
        date: wednesday,
        checked: checkDayOfTheWeek(wednesday, checks),
      },
      {
        text: "T",
        date: thursday,
        checked: checkDayOfTheWeek(thursday, checks),
      },
      { text: "F", date: friday, checked: checkDayOfTheWeek(friday, checks) },
      {
        text: "S",
        date: saturday,
        checked: checkDayOfTheWeek(saturday, checks),
      },
      { text: "S", date: sunday, checked: checkDayOfTheWeek(sunday, checks) },
    ];

    const checkedDays = days.filter((day) => day.checked);

    return { checkedDays, days };
  }

  const firstDay = dayjs().startOf("week");
  const sunday = firstDay.format("YYYY-MM-DD");
  const monday = firstDay.add(1, "day").format("YYYY-MM-DD");
  const tuesday = firstDay.add(2, "day").format("YYYY-MM-DD");
  const wednesday = firstDay.add(3, "day").format("YYYY-MM-DD");
  const thursday = firstDay.add(4, "day").format("YYYY-MM-DD");
  const friday = firstDay.add(5, "day").format("YYYY-MM-DD");
  const saturday = firstDay.add(6, "day").format("YYYY-MM-DD");

  const days: CheckDay[] = [
    { text: "S", date: sunday, checked: checkDayOfTheWeek(sunday, checks) },
    { text: "M", date: monday, checked: checkDayOfTheWeek(monday, checks) },
    { text: "T", date: tuesday, checked: checkDayOfTheWeek(tuesday, checks) },
    {
      text: "W",
      date: wednesday,
      checked: checkDayOfTheWeek(wednesday, checks),
    },
    { text: "T", date: thursday, checked: checkDayOfTheWeek(thursday, checks) },
    { text: "F", date: friday, checked: checkDayOfTheWeek(friday, checks) },
    { text: "S", date: saturday, checked: checkDayOfTheWeek(saturday, checks) },
  ];

  const checkedDays = days.filter((day) => day.checked);

  return { checkedDays, days };
}
