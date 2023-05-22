import {
  Pressable as RNPressable,
  PressableProps,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme";

interface Props extends PressableProps {
  children: string;
  color: keyof typeof theme.colors;
  icon?: string;
}

export default function Pressable({ children, color, icon, ...props }: Props) {
  return (
    <RNPressable
      style={[styles.container, { borderColor: theme.colors[color] as string }]}
      {...props}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={24}
          color={theme.colors[color] as string}
          style={{ paddingRight: theme.spacing.s }}
        />
      )}
      <Text style={[styles.text, { color: theme.colors[color] as string }]}>
        {children}
      </Text>
    </RNPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.spacing.m,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
});
