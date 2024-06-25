/** @format */
"use client";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";
import Home from "./page";
import { DocsPage } from "./docs";
import Header from "./components/Header";
import { presets } from "./constants/presets";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import {
  decodeThemeFromURL,
  encodeThemeToURL,
  generateDarkTheme,
  generatePalette,
} from "./utils/themeUtils";
import { useThemeHistory } from "./hooks/useThemeHistory";
import { useMediaQuery } from "@mantine/hooks";

extend([a11yPlugin, harmoniesPlugin]);

function App() {
  const [themeName, setThemeName] = useState("MyTheme");
  const {
    currentThemes,
    currentPresetName,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useThemeHistory(presets.Gruvbox.light, presets.Gruvbox.dark);
  const [menuOpened, setMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const [currPresetName, setCurrentPresetName] = useState<string | null>(
    currentPresetName,
  );
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [applyToWebsite, setApplyToWebsite] = useState(true);
  const [accessibilityWarnings, setAccessibilityWarnings] = useState<string[]>(
    [],
  );
  const [shareURL, setShareURL] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const isDark = currentTheme === "dark";

  const handleCompare = () => {
    setShowComparison(true);
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

  useEffect(() => {
    const sharedTheme = decodeThemeFromURL();
    if (sharedTheme) {
      addToHistory(sharedTheme.light, sharedTheme.dark);
    }
  }, []);

  // Apply the current theme to the container if applyToWebsite is true
  const containerStyle = applyToWebsite
    ? {
        backgroundColor: currentThemes[currentTheme].colors.background,
        color: currentThemes[currentTheme].colors.text,
      }
    : {};

  useEffect(() => {
    if (applyToWebsite) {
      document.body.style.backgroundColor =
        currentThemes[currentTheme].colors.background;
      document.body.style.color = currentThemes[currentTheme].colors.text;
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [applyToWebsite, currentTheme, currentThemes]);

  return (
    <Router>
      <Header isMobile={isMobile} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              setCurrentTheme={setCurrentTheme}
              themeName={themeName}
              setThemeName={setThemeName}
              currentThemes={currentThemes}
              addToHistory={addToHistory}
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
              handleCompare={handleCompare}
              handleGeneratePalette={handleGeneratePalette}
              shareTheme={shareTheme}
              syncDarkTheme={syncDarkTheme}
              showComparison={showComparison}
              setShowComparison={setShowComparison}
              accessibilityWarnings={accessibilityWarnings}
              updateTheme={updateTheme}
              applyToWebsite={applyToWebsite}
              containerStyle={containerStyle}
              shareURL={shareURL}
              theme={currentThemes[currentTheme]}
              //@ts-ignore
              currPresetName={currPresetName}
              handlePresetChange={handlePresetChange}
              setCurrentPresetName={setCurrentPresetName}
              setApplyToWebsite={setApplyToWebsite}
            />
          }
        />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
