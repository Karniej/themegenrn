/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  ColorPicker,
  Stack,
  Text,
  TextInput,
  Button,
  Group,
  Switch,
  Paper,
  Select,
  Alert,
} from "@mantine/core";
import { colord, random, AnyColor, extend, Colord } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import { presets } from "./utils/presets";
import AccessibilityWarnings from "./components/AccessibilityWarnings";
import ThemeControls from "./components/ThemeControls";
import DownloadSection from "./components/DownloadSection";
import ThemePreview from "./components/ThemePreview";
import DetailedThemePreview from "./components/DetailedThemePreview";

extend([a11yPlugin, harmoniesPlugin]);

type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};

export default function Home() {
  const [themeName, setThemeName] = useState("MyTheme");
  const [lightTheme, setLightTheme] = useState<Theme>(presets.Default.light);
  const [darkTheme, setDarkTheme] = useState<Theme>(presets.Default.dark);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [applyToWebsite, setApplyToWebsite] = useState(false);
  const [accessibilityWarnings, setAccessibilityWarnings] = useState<string[]>(
    [],
  );
  const [shareURL, setShareURL] = useState("");
  const isLightTheme = currentTheme === "light";

  const updateTheme = (key: keyof Theme["colors"], value: string) => {
    const newTheme = isLightTheme ? { ...lightTheme } : { ...darkTheme };
    newTheme.colors[key] = value;

    if (isLightTheme) {
      setLightTheme(newTheme);
    } else {
      setDarkTheme(newTheme);
    }

    checkAccessibility(newTheme);
  };

  const checkAccessibility = (theme: Theme) => {
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
    setLightTheme(presets[presetName].light);
    setDarkTheme(presets[presetName].dark);
    checkAccessibility(
      isLightTheme ? presets[presetName].light : presets[presetName].dark,
    );
  };

  useEffect(() => {
    if (applyToWebsite) {
      document.body.style.backgroundColor = isLightTheme
        ? lightTheme.colors.background
        : darkTheme.colors.background;
      document.body.style.color = isLightTheme
        ? lightTheme.colors.text
        : darkTheme.colors.text;
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [applyToWebsite, currentTheme, lightTheme, darkTheme]);

  useEffect(() => {
    if (applyToWebsite) {
      document.body.style.backgroundColor = isLightTheme
        ? lightTheme.colors.background
        : darkTheme.colors.background;
      document.body.style.color = isLightTheme
        ? lightTheme.colors.text
        : darkTheme.colors.text;
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [applyToWebsite, currentTheme, lightTheme, darkTheme]);

  return (
    <Container
      size="lg"
      style={
        applyToWebsite
          ? {
              backgroundColor: isLightTheme
                ? lightTheme.colors.background
                : darkTheme.colors.background,
              color: isLightTheme
                ? lightTheme.colors.text
                : darkTheme.colors.text,
            }
          : {}
      }
    >
      <Stack spacing="xl">
        <Title order={1} align="center" mt="xl">
          React Navigation Theme Generator
        </Title>

        <Select
          label="Choose a preset"
          data={Object.keys(presets)}
          scrollAreaProps={{
            style: {
              color: isLightTheme
                ? lightTheme.colors.text
                : darkTheme.colors.text,
            },
          }}
          labelProps={{
            style: {
              color: isLightTheme
                ? lightTheme.colors.text
                : darkTheme.colors.text,
            },
          }}
          onChange={(value) => value && handlePresetChange(value)}
        />

        <Switch
          checked={isLightTheme}
          onChange={() =>
            setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          label={`Current Theme: ${isLightTheme ? "Light" : "Dark"}`}
        />

        <Switch
          checked={applyToWebsite}
          onChange={(event) => setApplyToWebsite(event.currentTarget.checked)}
          label="Apply theme to website"
        />

        <ThemeControls
          theme={isLightTheme ? lightTheme : darkTheme}
          updateTheme={updateTheme}
        />

        <AccessibilityWarnings warnings={accessibilityWarnings} />

        <DetailedThemePreview theme={isLightTheme ? lightTheme : darkTheme} />

        <DownloadSection
          themeName={themeName}
          setThemeName={setThemeName}
          lightTheme={lightTheme}
          darkTheme={darkTheme}
        />
      </Stack>
    </Container>
  );
}
