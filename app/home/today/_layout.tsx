import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../../theme";
import Text from "../../../components/styled/Text";

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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: "modal",
          title: "New habit",
          headerLeft: () => (
            <Link href="home/today" asChild>
              <Pressable>
                <Text>Cancel</Text>
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="home/today" asChild>
              <Pressable>
                <Text>Save</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}