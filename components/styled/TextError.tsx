import { useTheme } from "../../contexts/themeContext";
import Text from "./Text";

interface Props {
  title: string;
}

export default function TextError({ title }: Props) {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        alignSelf: "flex-start",
        paddingTop: theme.spacing.xs,
        fontSize: 14,
        color: theme.colors.danger,
      }}
    >
      {title}
    </Text>
  );
}
