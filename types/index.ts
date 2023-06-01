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
