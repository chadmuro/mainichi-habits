import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { theme } from "../../theme";

interface Props extends TextProps {
  children: string;
}

export default function Text({ children, ...props }: Props) {
  return (
    <RNText {...props} style={[styles.text, props.style]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
  },
});
