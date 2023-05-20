import { theme } from "../../theme";
import Text from "./Text";

interface Props {
  title: string;
}

export default function TextLabel({ title }: Props) {
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
