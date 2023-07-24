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
  red: {
    light: "#fecaca",
    main: "#ef4444",
    dark: "#991b1b",
  },
  orange: {
    light: "#fed7aa",
    main: "#f97316",
    dark: "#9a3412",
  },
  amber: {
    light: "#fde68a",
    main: "#f59e0b",
    dark: "#92400e",
  },
  yellow: {
    light: "#fef08a",
    main: "#eab308",
    dark: "#854d0e",
  },
  lime: {
    light: "#d9f99d",
    main: "#84cc16",
    dark: "#3f6212",
  },
  green: {
    light: "#bbf7d0",
    main: "#22c55e",
    dark: "#166534",
  },
  emerald: {
    light: "#a7f3d0",
    main: "#10b981",
    dark: "#065f46",
  },
  teal: {
    light: "#99f6e4",
    main: "#14b8a6",
    dark: "#115e59",
  },
  cyan: {
    light: "#a5f3fc",
    main: "#06b6d4",
    dark: "#155e75",
  },
  sky: {
    light: "#bae6fd",
    main: "#0ea5e9",
    dark: "#075985",
  },
  blue: {
    light: "#bfdbfe",
    main: "#3b82f6",
    dark: "#1e40af",
  },
  indigo: {
    light: "#c7d2fe",
    main: "#6366f1",
    dark: "#3730a3",
  },
  violet: {
    light: "#ddd6fe",
    main: "#8b5cf6",
    dark: "#5b21b6",
  },
  purple: {
    light: "#e9d5ff",
    main: "#a855f7",
    dark: "#6b21a8",
  },
  fuchsia: {
    light: "#f5d0fe",
    main: "#d946ef",
    dark: "#86198f",
  },
  pink: {
    light: "#fbcfe8",
    main: "#ec4899",
    dark: "#9d174d",
  },
  rose: {
    light: "#fecdd3",
    main: "#f43f5e",
    dark: "#9f1239",
  },
  slate: {
    light: "#e2e8f0",
    main: "#64748b",
    dark: "#1e293b",
  },
  gray: {
    light: "#e5e7eb",
    main: "#6b7280",
    dark: "#1f2937",
  },
  // zinc: {
  //   light: "#e4e4e7",
  //   main: "#71717a",
  //   dark: "#27272a",
  // },
  neutral: {
    light: "#e5e5e5",
    main: "#737373",
    dark: "#262626",
  },
  stone: {
    light: "#e7e5e4",
    main: "#78716c",
    dark: "#292524",
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
