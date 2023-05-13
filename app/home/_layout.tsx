import { Pressable, Text } from "react-native";
import { Link, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? theme.colors.primary : theme.colors.text,
              }}
            >
              Today
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
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
      <Tabs.Screen
        name="month"
        options={{
          title: "Month",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? theme.colors.primary : theme.colors.text,
              }}
            >
              Month
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="today-outline"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="year"
        options={{
          title: "Year",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? theme.colors.primary : theme.colors.text,
              }}
            >
              Year
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar-outline"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? theme.colors.primary : theme.colors.text,
              }}
            >
              Settings
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
    </Tabs>
  );
}
