const palette = {
  yellow: "#EEE600",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#0B0B0B",
  white: "#F0F2F3",
};

export const habitColors = {
  // slate: "#64748b",
  // gray: "#6b7280",
  // zinc: "#71717a",
  // neutral: "#737373",
  // stone: "#78716c",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};

export const theme = {
  colors: {
    text: palette.black,
    background: palette.white,
    foreground: palette.black,
    inputBackground: "#d8d9da",
    inputColor: "#787979",
    primary: "#007AFF",
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
