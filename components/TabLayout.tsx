import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function Today({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
});
