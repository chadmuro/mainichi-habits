import { View, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import Text from "../../components/styled/Text";
import TabLayout from "../../components/TabLayout";
import { useTheme } from "../../contexts/themeContext";
import SmallButton from "../../components/styled/SmallButton";
import { useSettingsState } from "../../store/settings";
import { Habit, SettingsTheme } from "../../types";
import { useHabitState } from "../../store/habits";
import SortHabits from "../../components/SortHabits";
import Button from "../../components/styled/Button";

const themes: SettingsTheme[] = ["auto", "dark", "light"];

export default function Settings() {
  const { theme } = useTheme();
  const { settings, updateSettings } = useSettingsState();
  const { habits } = useHabitState();

  const settingsTheme = settings.get()?.theme;

  function onThemePress(settingTheme: SettingsTheme) {
    updateSettings("theme", settingTheme);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("chadmurodev@gmail.com");
    Alert.alert("Email copied to clipboard");
  };

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
