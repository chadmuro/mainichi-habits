import { useTheme } from "../../contexts/themeContext";
import Text from "./Text";

interface Props {
  title: string;
}

export default function TextLabel({ title }: Props) {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        alignSelf: "flex-start",
        paddingBottom: theme.spacing.s,
        fontSize: 16,
      }}
    >
      {title}
    </Text>
  );
}
