import { Slot } from "expo-router";
import { DatabaseProvider } from "../contexts/databaseContext";
import { ThemeProvider } from "../contexts/themeContext";

export default function Layout() {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </DatabaseProvider>
  );
}
