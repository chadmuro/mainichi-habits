import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { theme } from "../../theme";

interface Props extends TextProps {
  children: string;
}

export default function Text({ children, ...props }: Props) {
  return (
    <RNText {...props} style={[props.style, styles.text]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
  },
});
