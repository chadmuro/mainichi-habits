import { View, StyleSheet } from "react-native";

interface Props {
  color: string;
  date: string;
}

export default function YearDay({ color, date }: Props) {
  return <View style={[styles.container, { backgroundColor: color }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 10,
  },
});
