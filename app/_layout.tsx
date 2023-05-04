import { Text } from "react-native";
import { Tabs } from "expo-router";
import Check from "../assets/navigation/check.svg";
import Month from "../assets/navigation/month.svg";
import Settings from "../assets/navigation/settings.svg";
import Year from "../assets/navigation/year.svg";

export default function BaseLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? "#000" : "#a5a5a5" }}>
              Today
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Check height={28} width={28} fill={focused ? "#000" : "#a5a5a5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="month"
        options={{
          title: "Month",
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? "#000" : "#a5a5a5" }}>
              Month
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Month height={28} width={28} fill={focused ? "#000" : "#a5a5a5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="year"
        options={{
          title: "Year",
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? "#000" : "#a5a5a5" }}>
              Year
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Year height={28} width={28} fill={focused ? "#000" : "#a5a5a5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, color: focused ? "#000" : "#a5a5a5" }}>
              Settings
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Settings
              height={28}
              width={28}
              fill={focused ? "#000" : "#a5a5a5"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
