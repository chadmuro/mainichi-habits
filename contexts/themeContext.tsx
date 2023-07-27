import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Appearance,
  AppState,
  ColorSchemeName,
  // useColorScheme,
} from "react-native";
import { theme, darkTheme } from "../theme";
import { useSettingsState } from "../store/settings";
import { Theme } from "../types";

type ThemeContextType = {
  theme: typeof theme;
  selectedTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { settings } = useSettingsState();
  // const currentTheme = useColorScheme();

  // TODO - update to useColorScheme when fixed
  // https://github.com/facebook/react-native/issues/35972
  const [currentTheme, setTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const eventSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          const theme = Appearance.getColorScheme();
          setTheme(theme);
        }
      }
    );

    return () => {
      eventSubscription.remove();
    };
  }, []);

  let selectedTheme: Theme = "dark";

  if (settings.get()?.theme == "auto") {
    selectedTheme = currentTheme ?? "dark";
  } else {
    selectedTheme = (settings.get()?.theme as Theme) ?? "dark";
  }

  let themeValue = darkTheme;
  if (selectedTheme === "dark") {
    themeValue = darkTheme;
  } else {
    themeValue = theme;
  }

  const value = { theme: themeValue, selectedTheme };

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
