import { Stack } from "expo-router";
import { useTheme } from "../../../contexts/themeContext";

export default function Year() {
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
          title: "Last 365 Days",
        }}
      />
    </Stack>
  );
}
