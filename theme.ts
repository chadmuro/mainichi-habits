import { Platform, PlatformColor } from "react-native";

const palette = {
  yellow: "#EEE600",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#0B0B0B",
  white: "#F0F2F3",
};

export const habitColors = {
  red: "#F44336",
  pink: "#E91E63",
  purple: "#9C27B0",
  deepPurple: "#673AB7",
  indigo: "#3F51B5",
  blue: "#2196F3",
  lightBlue: "#03A9F4",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4CAF50",
  lightGreen: "#8BC34A",
  lime: "#CDDC39",
  yellow: "#FFEB3B",
  amber: "#FFC107",
  orange: "#FF9800",
  deepOrange: "#FD2F40",
  brown: "#795548",
  grey: "#9E9E9E",
};

export const theme = {
  colors: {
    text: palette.black,
    background: palette.white,
    foreground: palette.black,
    inputBackground: "#d8d9da",
    inputColor: "#787979",
    primary:
      Platform.OS === "ios"
        ? PlatformColor("systemBlue")
        : PlatformColor("?attr/colorPrimary"),
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    habit: {
      ...habitColors,
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: "Raleway",
      fontSize: 36,
      fontWeight: "bold",
    },
    body: {
      fontFamily: "Merriweather",
      fontSize: 16,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.white,
    background: palette.black,
    foreground: palette.white,
    inputBackground: "#2a2727",
    inputColor: "#a5a5a5",
  },
};
