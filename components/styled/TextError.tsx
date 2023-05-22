import { theme } from "../../theme";
import Text from "./Text";

interface Props {
  title: string;
}

export default function TextError({ title }: Props) {
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
