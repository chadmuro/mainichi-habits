import { Alert, Pressable } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useHabitState } from "../../../../store/habits";
import { useTheme } from "../../../../contexts/themeContext";

export default function Layout() {
  const { theme } = useTheme();
  const { id } = useSearchParams();
  const router = useRouter();
  const { habits, deleteHabit } = useHabitState();
  const habit = habits.get().find((habit) => habit.id === id);

  // TODO: Show no data page
  if (!habit) {
    return;
  }

  function onDeleteSubmit() {
    if (habit) {
      deleteHabit(habit.id);
    }
    router.back();
  }

  function onDeletePress() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Are you sure you want to delete this habit?",
      "Once deleted, the data cannot be retrieved.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          onPress: onDeleteSubmit,
          style: "destructive",
        },
      ]
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: habit.title,
          headerRight: () => (
            <Pressable onPress={onDeletePress}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={theme.colors.danger}
              />
            </Pressable>
          ),
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
        <Stack.Screen
          name="notification"
          options={{
            presentation: "modal",
            title: "Reminder",
          }}
        />
      </Stack>
    </>
  );
}
