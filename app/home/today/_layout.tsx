import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { theme } from "../../../theme";

export default function Layout() {
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
          title: "Today",
          headerRight: () => (
            <Link href="home/today/add" asChild>
              <Pressable>
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: "modal",
          title: "New habit",
        }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
