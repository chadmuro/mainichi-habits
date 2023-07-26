import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../contexts/themeContext";

interface Props {
  children: React.ReactNode;
  onLayout?: () => void;
}

export default function TabLayout({ children, onLayout = undefined }: Props) {
  const { selectedTheme, theme } = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingVertical: theme.spacing.m,
          paddingHorizontal: theme.spacing.s,
        },
      ]}
    >
      {children}
      <StatusBar style={selectedTheme === "dark" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
