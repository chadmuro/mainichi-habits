import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../../components/styled/Text";
import TabLayout from "../../../components/TabLayout";
import { useTheme } from "../../../contexts/themeContext";
import SmallButton from "../../../components/styled/SmallButton";
import { useSettingsState } from "../../../store/settings";
import { Habit, SettingsTheme } from "../../../types";
import { useHabitState } from "../../../store/habits";
import SortHabits from "../../../components/SortHabits";
import Button from "../../../components/styled/Button";
import { useNotificationState } from "../../../store/notifications";
import { useNotifications } from "../../../hooks/useNotifications";

const themes: SettingsTheme[] = ["auto", "dark", "light"];

export default function Settings() {
  const { theme } = useTheme();
  const router = useRouter();
  const { settings, updateSettings } = useSettingsState();
  const { requestPermissionsAsync } = useNotifications();
  const { habits } = useHabitState();
  const { notifications } = useNotificationState();

  console.log(notifications.get());

  const settingsTheme = settings.get()?.theme;

  function onThemePress(settingTheme: SettingsTheme) {
    updateSettings("theme", settingTheme);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("chadmurodev@gmail.com");
    Alert.alert(
      "Email copied to clipboard",
      "👋 Looking forward to hearing from you soon!"
    );
  };

  async function onNotificationPress() {
    const permission = await requestPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert(
        "Turn on notification permissions",
        "To use this feature, you must habe permissions turned on.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
    router.push(`home/settings/notifications`);
  }

  return (
    <TabLayout>
      <ScrollView style={{ width: "100%" }}>
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
            <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
              Theme
            </Text>
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
            <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
              Reorder habits
            </Text>
            <SortHabits habits={habits.get() as Habit[]} />
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
              <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
                Notifications
              </Text>
              {/* <Pressable onPress={() => onNotificationPress()}>
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable> */}
            </View>
            <View style={{ width: "100%" }}>
              {notifications.get()?.length! > 0 ? (
                notifications
                  .get()
                  ?.map((notif) => <Text>{notif.habit_id}</Text>)
              ) : (
                <Text>No notifications</Text>
              )}
            </View>
          </View>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.text, padding: theme.spacing.m },
            ]}
          >
            <Text style={[styles.title, { paddingBottom: theme.spacing.s }]}>
              Contact me
            </Text>
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
  },
  subTitle: {
    color: "#a5a5a5",
  },
});
