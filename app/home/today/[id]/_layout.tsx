import { Stack, useSearchParams } from "expo-router";
import React from "react";
import { useHabitState } from "../../../../store/habits";
import { useTheme } from "../../../../contexts/themeContext";

export default function Layout() {
  const { theme } = useTheme();
  const { id } = useSearchParams();
  const { habits } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: habit.title,
        }}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            presentation: "modal",
            title: "Edit habit",
          }}
        />
        <Stack.Screen
          name="past"
          options={{
            presentation: "modal",
            title: "Past dates",
          }}
        />
      </Stack>
    </>
  );
}
