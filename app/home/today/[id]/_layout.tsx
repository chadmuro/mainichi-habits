import { Stack, useSearchParams } from "expo-router";
import React from "react";
import { theme } from "../../../../theme";
import { useHabitState } from "../../../../store/habits";

export default function Layout() {
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
      </Stack>
    </>
  );
}
