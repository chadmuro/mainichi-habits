import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";

export default function Layout() {
  const { theme } = useTheme();

  return (
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
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="notifications/[id]"
        options={{
          presentation: "modal",
          title: "Notifications",
        }}
      />
    </Stack>
  );
}
