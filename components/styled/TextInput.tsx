import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../contexts/themeContext";

interface Props extends TextInputProps {}

export default function TextInput({ ...props }: Props) {
  const { theme } = useTheme();

  return (
    <RNTextInput
      {...props}
      style={[
        props.style,
        styles.input,
        {
          color: theme.colors.text,
          backgroundColor: theme.colors.inputBackground,
        },
      ]}
      placeholderTextColor={theme.colors.inputColor}
      selectionColor={theme.colors.primary}
      returnKeyType="done"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    width: "100%",
    height: 48,
    fontSize: 16,
    padding: 10,
  },
});
