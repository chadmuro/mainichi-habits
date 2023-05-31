import { Slot } from "expo-router";
import { DatabaseProvider } from "../contexts/databaseContext";
import { ThemeProvider } from "../contexts/themeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ height: "100%", width: "100%" }}>
      <DatabaseProvider>
        <ThemeProvider>
          <Slot />
        </ThemeProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
