/** @format */

"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Stack,
  TextInput,
  Button,
  Group,
  Switch,
  Select,
  Modal,
} from "@mantine/core";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import { presets } from "./utils/presets";
import AccessibilityWarnings from "./components/AccessibilityWarnings";
import ThemeControls from "./components/ThemeControls";
import DownloadSection from "./components/DownloadSection";
import DetailedThemePreview from "./components/DetailedThemePreview";
import {
  decodeThemeFromURL,
  encodeThemeToURL,
  generateDarkTheme,
  generatePalette,
} from "./utils/themeUtils";
import { useThemeHistory } from "./hooks/useThemeHistory";
import ThemeComparison from "./components/ThemeComparison";

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
  const {
    currentThemes,
    currentPresetName,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useThemeHistory(presets.Default.light, presets.Default.dark);

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [applyToWebsite, setApplyToWebsite] = useState(false);
  const [accessibilityWarnings, setAccessibilityWarnings] = useState<string[]>(
    [],
  );
  const [shareURL, setShareURL] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPreset, setComparisonPreset] = useState<string | null>(null);

  const handleCompare = () => {
    setShowComparison(true);
  };

  const updateTheme = (key: keyof Theme["colors"], value: string) => {
    const newTheme = {
      ...currentThemes[currentTheme],
      colors: { ...currentThemes[currentTheme].colors, [key]: value },
    };
    const updatedThemes = { ...currentThemes, [currentTheme]: newTheme };
    addToHistory(updatedThemes.light, updatedThemes.dark);
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
    if (presets[presetName]) {
      const newLightTheme = { ...presets[presetName].light };
      const newDarkTheme = { ...presets[presetName].dark };
      addToHistory(newLightTheme, newDarkTheme);
      checkAccessibility(
        currentTheme === "light" ? newLightTheme : newDarkTheme,
      );
    }
  };

  const handleGeneratePalette = () => {
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Use the generateColorPalette function to create a full theme
    const { light, dark } = generatePalette(randomColor);

    // Add the new themes to history
    addToHistory(light, dark);

    // Update the current theme
    setCurrentTheme(currentTheme); // This triggers a re-render with the new theme

    // Check accessibility for the current theme
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
    <Container
      size="lg"
      style={
        applyToWebsite
          ? {
              backgroundColor: currentThemes[currentTheme].colors.background,
              color: currentThemes[currentTheme].colors.text,
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
          value={currentPresetName || undefined}
          onChange={(value) => value && handlePresetChange(value)}
          scrollAreaProps={{
            style: {
              color: "black",
            },
          }}
          placeholder="Choose a preset"
        />

        <Group>
          <Switch
            checked={currentTheme === "dark"}
            onChange={() =>
              setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
            label={`Current Theme: ${
              currentTheme === "light" ? "Light" : "Dark"
            }`}
          />
          <Switch
            checked={applyToWebsite}
            onChange={(event) => setApplyToWebsite(event.currentTarget.checked)}
            label="Apply theme to website"
          />
          <Group justify="space-between">
            <Button onClick={handleCompare}>Compare with Preset</Button>
            <Button onClick={handleGeneratePalette}>
              Generate Color Palette
            </Button>

            {/* <Button onClick={handleGenerateAccessibleTheme}>
              Generate a theme
            </Button> */}
          </Group>
        </Group>
        <Modal
          opened={showComparison}
          onClose={() => setShowComparison(false)}
          size="xl"
        >
          <ThemeComparison
            currentTheme={currentThemes[currentTheme]}
            presets={presets}
            onThemeModeChange={(isDark) =>
              setCurrentTheme(isDark ? "dark" : "light")
            }
            currentThemeName="Current Theme"
          />
        </Modal>
        <Group>
          <Button onClick={shareTheme}>Share Theme</Button>
          <Button onClick={syncDarkTheme}>Sync Dark Theme</Button>
          <Button onClick={undo} disabled={!canUndo}>
            Undo
          </Button>
          <Button onClick={redo} disabled={!canRedo}>
            Redo
          </Button>
        </Group>

        {shareURL && (
          <TextInput
            label="Share URL"
            value={shareURL}
            readOnly
            onClick={(event) => event.currentTarget.select()}
          />
        )}

        <ThemeControls
          theme={currentThemes[currentTheme]}
          updateTheme={updateTheme}
        />

        <AccessibilityWarnings warnings={accessibilityWarnings} />

        <DetailedThemePreview theme={currentThemes[currentTheme]} />

        <DownloadSection
          themeName={themeName}
          setThemeName={setThemeName}
          lightTheme={currentThemes.light}
          darkTheme={currentThemes.dark}
          setLightTheme={(theme) => addToHistory(theme, currentThemes.dark)}
          setDarkTheme={(theme) => addToHistory(currentThemes.light, theme)}
        />
      </Stack>
    </Container>
  );
}
