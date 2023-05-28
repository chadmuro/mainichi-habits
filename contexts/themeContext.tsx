import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { theme, darkTheme } from "../theme";

type ThemeContextType = {
  theme: typeof theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const colorScheme = useColorScheme();

  const selectedTheme = colorScheme === "dark" ? darkTheme : theme;

  const value = { theme: selectedTheme };

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
