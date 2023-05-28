import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { theme, darkTheme } from "../theme";
import { useSettingsState } from "../store/settings";
import { Theme } from "../types";

type ThemeContextType = {
  theme: typeof theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { settings } = useSettingsState();
  const colorScheme = useColorScheme();

  let selectedTheme: Theme = "dark";

  if (settings.get()?.theme === "auto") {
    selectedTheme = colorScheme ?? "dark";
  } else {
    selectedTheme = settings.get()?.theme ?? "dark";
  }

  let themeValue = darkTheme;
  if (selectedTheme === "dark") {
    themeValue = darkTheme;
  } else {
    themeValue = theme;
  }

  const value = { theme: themeValue };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProdiver");
  }
  return context;
};

export { ThemeProvider, useTheme };
