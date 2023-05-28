export type Habit = {
  id: string;
  title: string;
  days_per_week: number;
  color: string;
  start_date: string;
};

export type Check = {
  id: string;
  habit_id: string;
  date: string;
};

export type Theme = "dark" | "light";

export type Settings = {
  theme: Theme & "auto";
};
