import { Text } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../contexts/themeContext";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
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
        }}
      />
      <Tabs.Screen
        name="month"
        options={{
          href: null,
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
          href: null,
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
