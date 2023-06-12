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
  hour: number;
  minute: number;
};

export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;
