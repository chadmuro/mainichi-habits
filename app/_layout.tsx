import { Tabs } from "expo-router";

export default function BaseLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the route to hide.
        name="index"
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="month"
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="year"
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="settings"
      />
    </Tabs>
  );
}
