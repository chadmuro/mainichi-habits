const palette = {
  yellow: "#EEE600",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#0B0B0B",
  white: "#F0F2F3",
};

export const habitColors = {
  red: "#FFABAB",
  blue: "#6EB5FF",
  green: "#BFFCC6",
  yellow: "#FFF5BA",
  pink: "#FF9CEE",
  purple: "#C5A3FF",
};

export const theme = {
  colors: {
    text: palette.white,
    background: palette.black,
    foreground: palette.white,
    primary: palette.yellow,
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
