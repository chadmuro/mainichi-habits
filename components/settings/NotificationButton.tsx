import { Alert, Linking, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/themeContext";
import Text from "../styled/Text";
import { formatTime } from "../../utils/formatTime";
import { Notification, weekday } from "../../types";
import { useNotifications } from "../../hooks/useNotifications";
import { useRouter } from "expo-router";

interface Props {
  notification: Notification;
}

export default function NotificationButton({ notification }: Props) {
  const { theme } = useTheme();
  const router = useRouter();
  const { requestPermissionsAsync } = useNotifications();

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
    router.push(`/home/settings/notifications/${notification.habit_id}`);
  }

  return (
    <TouchableOpacity
      onPress={onNotificationPress}
      key={notification.id}
      style={{
        backgroundColor: theme.colors.background,
        width: "100%",
        padding: theme.spacing.m,
        borderColor: theme.colors.text,
        gap: 5,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ fontSize: 16, flex: 1, paddingRight: theme.spacing.s }}>
          {notification.title}
        </Text>
        <Text>{`@ ${formatTime(notification.hour)}:${formatTime(
          notification.minute
        )}`}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {notification.days
          .split(",")
          .sort((a, b) => Number(a) - Number(b))
          .map((day) => (
            <View
              key={day}
              style={{
                borderColor: theme.colors.text,
                borderWidth: 1,
                borderRadius: 10,
                padding: theme.spacing.xs,
                minWidth: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12 }}>{weekday[day]}</Text>
            </View>
          ))}
      </View>
    </TouchableOpacity>
  );
}
