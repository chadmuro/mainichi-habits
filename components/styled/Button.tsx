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
  color: string;
  icon?: string;
}

export default function Pressable({ children, color, icon, ...props }: Props) {
  return (
    <RNPressable style={[styles.container, { borderColor: color }]} {...props}>
      {icon && (
        <Ionicons
          name={icon as any}
          size={24}
          color={color}
          style={{ paddingRight: theme.spacing.s }}
        />
      )}
      <Text style={[styles.text, { color: color }]}>{children}</Text>
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
