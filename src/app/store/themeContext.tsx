/** @format */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { HomeProps } from "../types/homepage";
import { Theme } from "../types/theme";
import { presets } from "../constants/presets";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import {
  decodeThemeFromURL,
  encodeThemeToURL,
  generateDarkTheme,
  generatePalette,
} from "../utils/themeUtils";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

extend([a11yPlugin, harmoniesPlugin]);

interface HistoryEntry {
  presetName: string;
  light: Theme;
  dark: Theme;
}

const ThemeContext = createContext<HomeProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState("MyTheme");
  const [menuOpened, setMenuOpened] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [applyToWebsite, setApplyToWebsite] = useState(true);
  const [accessibilityWarnings, setAccessibilityWarnings] = useState<string[]>(
    [],
  );
  const [shareURL, setShareURL] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [currPresetName, setCurrentPresetName] = useState<string | null>(null);

  // History management
  const initialLight: Theme = presets.Gruvbox.light;
  const initialDark: Theme = presets.Gruvbox.dark;
  const [history, setHistory] = useState<HistoryEntry[]>([
    { presetName: "Default", light: initialLight, dark: initialDark },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  const mantineTheme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const addToHistory = useCallback(
    (light: Theme, dark: Theme) => {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push({ presetName: "Default", light, dark });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    },
    [history, currentIndex],
  );

  const undo = () => {
    if (canUndo) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (canRedo) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentThemes = history[currentIndex];
  const currentPresetName = history[currentIndex].presetName;

  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleGeneratePalette = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const { light, dark } = generatePalette(randomColor);
    addToHistory(light, dark);
    setCurrentTheme(currentTheme);
    checkAccessibility(currentTheme === "light" ? light : dark);
  };

  const shareTheme = () => {
    const url = encodeThemeToURL(currentThemes);
    setShareURL(url);
  };

  const syncDarkTheme = () => {
    const darkTheme = generateDarkTheme(currentThemes.light);
    addToHistory(currentThemes.light, darkTheme);
  };

  const updateTheme = (key: string, value: any) => {
    console.log(key, value);
    const keys = key.split(".");
    const newTheme = JSON.parse(JSON.stringify(currentThemes[currentTheme]));
    let current = newTheme;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    const updatedThemes = { ...currentThemes, [currentTheme]: newTheme };
    addToHistory(updatedThemes.light, updatedThemes.dark);
    checkAccessibility(newTheme);
  };

  const checkAccessibility = (theme: any) => {
    const warnings: string[] = [];
    const textColor = colord(theme.colors.text);
    const bgColor = colord(theme.colors.background);
    const primaryColor = colord(theme.colors.primary);

    if (textColor.contrast(bgColor) < 4.5) {
      warnings.push(
        "Text color doesn't have enough contrast with the background",
      );
    }

    if (primaryColor.contrast(bgColor) < 3) {
      warnings.push(
        "Primary color doesn't have enough contrast with the background",
      );
    }

    setAccessibilityWarnings(warnings);
  };

  const handlePresetChange = (presetName: string) => {
    if (presets[presetName]) {
      const newLightTheme = { ...presets[presetName].light };
      const newDarkTheme = { ...presets[presetName].dark };
      setCurrentPresetName(presetName);
      addToHistory(newLightTheme, newDarkTheme);
      checkAccessibility(
        currentTheme === "light" ? newLightTheme : newDarkTheme,
      );
    }
  };

  useEffect(() => {
    const sharedTheme = decodeThemeFromURL();
    if (sharedTheme) {
      addToHistory(sharedTheme.light, sharedTheme.dark);
    }
  }, [addToHistory]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (applyToWebsite) {
        document.body.style.backgroundColor =
          currentThemes[currentTheme].colors.background;
        document.body.style.color = currentThemes[currentTheme].colors.text;
      } else {
        document.body.style.backgroundColor =
          mantineTheme.colors.gray[colorScheme === "dark" ? 9 : 0];
        document.body.style.color =
          mantineTheme.colors.gray[colorScheme === "dark" ? 0 : 9];
      }
    }
  }, [
    addToHistory,
    applyToWebsite,
    currentTheme,
    currentThemes,
    colorScheme,
    mantineTheme.colors.gray,
  ]);

  const value: HomeProps = {
    themeName,
    setThemeName,
    currentThemes,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    handleCompare,
    handleGeneratePalette,
    shareTheme,
    shareURL,
    applyToWebsite,
    showComparison,
    setShowComparison,
    accessibilityWarnings,
    updateTheme,
    theme: currentThemes[currentTheme],
    setCurrentTheme,
    menuOpened,
    setMenuOpened,
    currPresetName,
    handlePresetChange,
    setApplyToWebsite,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
