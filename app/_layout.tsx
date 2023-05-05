import { Text } from "react-native";
import { Tabs } from "expo-router";
import Check from "../assets/navigation/check.svg";
import Month from "../assets/navigation/month.svg";
import Settings from "../assets/navigation/settings.svg";
import Year from "../assets/navigation/year.svg";
import { theme } from "../theme";

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
        name="index"
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
            <Check
              height={28}
              width={28}
              fill={focused ? theme.colors.primary : theme.colors.text}
            />
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
            <Month
              height={28}
              width={28}
              fill={focused ? theme.colors.primary : theme.colors.text}
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
            <Year
              height={28}
              width={28}
              fill={focused ? theme.colors.primary : theme.colors.text}
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
            <Settings
              height={28}
              width={28}
              fill={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
    </Tabs>
  );
}
