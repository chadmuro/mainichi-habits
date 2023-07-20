import { TextStyle } from "react-native/types";

const palette = {
  yellow: "#EEE600",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#0B0B0B",
  offblack: "#3c3c3c",
  white: "#F0F2F3",
  offwhite: "#D2D3D5",
};

export type HabitMainColor = keyof typeof habitMainColorMap;

export const habitMainColorMap = {
  "#64748b": "slate",
  "#6b7280": "gray",
  "#71717a": "zinc",
  "#737373": "neutral",
  "#78716c": "stone",
  "#ef4444": "red",
  "#f97316": "orange",
  "#f59e0b": "amber",
  "#eab308": "yellow",
  "#84cc16": "lime",
  "#22c55e": "green",
  "#10b981": "emerald",
  "#14b8a6": "teal",
  "#06b6d4": "cyan",
  "#0ea5e9": "sky",
  "#3b82f6": "blue",
  "#6366f1": "indigo",
  "#8b5cf6": "violet",
  "#a855f7": "purple",
  "#d946ef": "fuchsia",
  "#ec4899": "pink",
  "#f43f5e": "rose",
};

export type HabitColorTitle = keyof typeof habitColors;

export const habitColors = {
  slate: {
    light: "#cbd5e1",
    main: "#64748b",
    dark: "#334155",
  },
  gray: {
    light: "#d1d5db",
    main: "#6b7280",
    dark: "#374151",
  },
  zinc: {
    light: "#d4d4d8",
    main: "#71717a",
    dark: "#3f3f46",
  },
  neutral: {
    light: "#d4d4d4",
    main: "#737373",
    dark: "#404040",
  },
  stone: {
    light: "#d6d3d1",
    main: "#78716c",
    dark: "#44403c",
  },
  red: {
    light: "#fca5a5",
    main: "#ef4444",
    dark: "#b91c1c",
  },
  orange: {
    light: "#fdba74",
    main: "#f97316",
    dark: "#c2410c",
  },
  amber: {
    light: "#fcd34d",
    main: "#f59e0b",
    dark: "#b45309",
  },
  yellow: {
    light: "#fde047",
    main: "#eab308",
    dark: "#a16207",
  },
  lime: {
    light: "#bef264",
    main: "#84cc16",
    dark: "#4d7c0f",
  },
  green: {
    light: "#86efac",
    main: "#22c55e",
    dark: "#15803d",
  },
  emerald: {
    light: "#6ee7b7",
    main: "#10b981",
    dark: "#047857",
  },
  teal: {
    light: "#5eead4",
    main: "#14b8a6",
    dark: "#0f766e",
  },
  cyan: {
    light: "#67e8f9",
    main: "#06b6d4",
    dark: "#0e7490",
  },
  sky: {
    light: "#7dd3fc",
    main: "#0ea5e9",
    dark: "#0369a1",
  },
  blue: {
    light: "#93c5fd",
    main: "#3b82f6",
    dark: "#1d4ed8",
  },
  indigo: {
    light: "#a5b4fc",
    main: "#6366f1",
    dark: "#4338ca",
  },
  violet: {
    light: "#c4b5fd",
    main: "#8b5cf6",
    dark: "#6d28d9",
  },
  purple: {
    light: "#d8b4fe",
    main: "#a855f7",
    dark: "#7e22ce",
  },
  fuchsia: {
    light: "#f0abfc",
    main: "#d946ef",
    dark: "#a21caf",
  },
  pink: {
    light: "#f9a8d4",
    main: "#ec4899",
    dark: "#be185d",
  },
  rose: {
    light: "#fda4af",
    main: "#f43f5e",
    dark: "#be123c",
  },
};

export const theme = {
  colors: {
    text: palette.black,
    background: palette.white,
    foreground: palette.offwhite,
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
      fontFamily: "Futura",
      fontSize: 36,
      fontWeight: "bold" as TextStyle["fontWeight"],
    },
    body: {
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
    foreground: palette.offblack,
    inputBackground: "#2a2727",
    inputColor: "#a5a5a5",
  },
};
