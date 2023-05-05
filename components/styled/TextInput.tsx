import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { theme } from "../../theme";

interface Props extends TextInputProps {}

export default function TextInput({ ...props }: Props) {
  return (
    <RNTextInput
      {...props}
      style={[props.style, styles.input]}
      placeholderTextColor="#a5a5a5"
      selectionColor={theme.colors.text}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    width: "100%%",
    height: 48,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#2a2727",
    color: theme.colors.text,
  },
});
