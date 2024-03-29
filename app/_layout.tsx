import { Slot } from "expo-router";
import * as Notifications from "expo-notifications";
import { DatabaseProvider } from "../contexts/databaseContext";
import { ThemeProvider } from "../contexts/themeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DatesProvider } from "../contexts/datesContext";

export { ErrorBoundary } from "expo-router";

// First, set the handler that will cause the notification to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ height: "100%", width: "100%" }}>
      <DatabaseProvider>
        <ThemeProvider>
          <DatesProvider>
            <Slot />
          </DatesProvider>
        </ThemeProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
