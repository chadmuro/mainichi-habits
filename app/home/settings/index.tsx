import { View, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import dayjs from "dayjs";
import Text from "../../../components/styled/Text";
import TabLayout from "../../../components/TabLayout";
import { useTheme } from "../../../contexts/themeContext";
import SmallButton from "../../../components/styled/SmallButton";
import { useSettingsState } from "../../../store/settings";
import { Habit, SettingsTheme, WeekStart } from "../../../types";
import { useHabitState } from "../../../store/habits";
import SortHabits from "../../../components/SortHabits";
import Button from "../../../components/styled/Button";
import { useNotificationState } from "../../../store/notifications";
import NotificationButton from "../../../components/settings/NotificationButton";
import { useFileSystem } from "../../../hooks/useFileSystem";

const themes: SettingsTheme[] = ["auto", "dark", "light"];

export default function Settings() {
  const { theme } = useTheme();
  const { settings, updateSettings } = useSettingsState();
  const { habits } = useHabitState();
  const { notifications } = useNotificationState();
  const { exportData, importData } = useFileSystem();

  const settingsTheme = settings.get()?.theme;
  const weekStart = settings.get()?.week_start;

  function onThemePress(settingTheme: SettingsTheme) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateSettings("theme", settingTheme);
  }

  function onWeekStartPress(weekStart: WeekStart) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateSettings("week_start", weekStart);
    dayjs.updateLocale("en", {
      weekStart: weekStart,
    });
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("chadmurodev@gmail.com");
    Alert.alert(
      "Email copied to clipboard",
      "👋 Looking forward to hearing from you soon!"
    );
  };

  return (
    <TabLayout>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            gap: theme.spacing.m,
          }}
        >
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={styles.title}>Theme</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {themes.map((themeText) => {
                let color = theme.colors.text;
                if (themeText === settingsTheme) {
                  color = theme.colors.primary;
                }
                return (
                  <SmallButton
                    key={themeText}
                    color={color}
                    onPress={() => onThemePress(themeText)}
                  >
                    {themeText}
                  </SmallButton>
                );
              })}
            </View>
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={styles.title}>Week starts on</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <SmallButton
                color={
                  weekStart === 0 ? theme.colors.primary : theme.colors.text
                }
                onPress={() => onWeekStartPress(0)}
              >
                Sunday
              </SmallButton>
              <SmallButton
                color={
                  weekStart === 1 ? theme.colors.primary : theme.colors.text
                }
                onPress={() => onWeekStartPress(1)}
              >
                Monday
              </SmallButton>
            </View>
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={styles.title}>Reorder habits</Text>
            {habits.get().length > 0 ? (
              <SortHabits habits={habits.get() as Habit[]} />
            ) : (
              <Text>No habits</Text>
            )}
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.title}>Reminders</Text>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
              {notifications.get().length > 0 ? (
                notifications
                  .get()
                  ?.map((notif) => (
                    <NotificationButton notification={notif} key={notif.id} />
                  ))
              ) : (
                <Text>No reminders</Text>
              )}
            </View>
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={styles.title}>Import / Export</Text>
            <View style={{ width: "100%", gap: 10 }}>
              <Button
                color={theme.colors.primary}
                onPress={() =>
                  Alert.alert(
                    "Export data",
                    "Save the file to your phone or send to another device. Then import that file into a new phone",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      { text: "Continue", onPress: exportData },
                    ]
                  )
                }
              >
                Export data
              </Button>
              <Button
                color={theme.colors.primary}
                onPress={() =>
                  Alert.alert(
                    "Are you sure you want to import data?",
                    "Your current data will be overwritten and is not recoverable.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      { text: "Select file", onPress: importData },
                    ]
                  )
                }
              >
                Import data
              </Button>
            </View>
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={styles.title}>Contact me</Text>
            <View style={{ width: "100%", gap: 10 }}>
              <Button
                color={theme.colors.primary}
                onPress={() => Linking.openURL("mailto:chadmurodev@gmail.com")}
              >
                Open default mail app
              </Button>
              <Button color={theme.colors.primary} onPress={copyToClipboard}>
                Copy email to clipboard
              </Button>
              <Button
                color={theme.colors.primary}
                onPress={() =>
                  Linking.openURL(
                    `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id6451048200?action=write-review`
                  )
                }
              >
                Write a review
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </TabLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 16,
  },
  subTitle: {
    color: "#a5a5a5",
  },
});
