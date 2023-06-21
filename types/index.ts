export type Habit = {
  id: string;
  title: string;
  days_per_week: number;
  color: string;
  start_date: string;
  seq: number;
};

export type Check = {
  id: string;
  habit_id: string;
  date: string;
};

export type Theme = "dark" | "light";

export type SettingsTheme = Theme | "auto";

export type Settings = {
  theme: SettingsTheme;
};

export type Notification = {
  id: string;
  habit_id: string;
  days: string;
  identifiers: string;
  hour: number;
  minute: number;
  title: string;
};

export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Day = { val: Weekday; text: string };

export const days: Day[] = [
  { val: 1, text: "Sun" },
  { val: 2, text: "Mon" },
  { val: 3, text: "Tue" },
  { val: 4, text: "Wed" },
  { val: 5, text: "Thu" },
  { val: 6, text: "Fri" },
  { val: 7, text: "Sat" },
];

export const weekday: { [key: string]: string } = {
  "1": "Sun",
  "2": "Mon",
  "3": "Tue",
  "4": "Wed",
  "5": "Thu",
  "6": "Fri",
  "7": "Sat",
};
