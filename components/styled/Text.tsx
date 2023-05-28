import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "../../contexts/themeContext";

interface Props extends TextProps {
  children: string;
}

export default function Text({ children, ...props }: Props) {
  const { theme } = useTheme();

  return (
    <RNText {...props} style={[{ color: theme.colors.text }, props.style]}>
      {children}
    </RNText>
  );
}
