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
  Paper,
  Box,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconPalette,
  IconShare,
  IconMoon,
  IconSun,
  IconDownload,
  IconArrowLeft,
  IconArrowRight,
  IconArrowsUpDown,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
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
import LivePreview from "./components/LivePreview";

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
  } = useThemeHistory(presets.Gruvbox.light, presets.Gruvbox.dark);

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

  const theme = useMantineTheme();
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
    <Box
      style={{
        backgroundColor: theme.colors.gray[0],
        minHeight: "100vh",
        padding: theme.spacing.xl,
        ...containerStyle, // Apply the current theme if applyToWebsite is true
      }}
    >
      <Container size="lg">
        <Stack p="xl">
          <Paper
            p="xl"
            radius="md"
            style={{
              background: applyToWebsite
                ? currentThemes[currentTheme].colors.card
                : `linear-gradient(135deg, ${theme.colors.blue[6]}, ${theme.colors.indigo[6]})`,
              color: applyToWebsite
                ? currentThemes[currentTheme].colors.text
                : theme.white,
            }}
          >
            <Title
              order={1}
              ta="center"
              style={{ fontSize: "2.5rem", marginBottom: theme.spacing.md }}
            >
              React Navigation Theme Generator
            </Title>
            <Text ta="center" size="lg">
              Create and customize beautiful themes with ease
            </Text>
          </Paper>

          <Group justify="space-between" align="flex-end">
            <Select
              label="Choose a preset"
              data={Object.keys(presets)}
              value={currentPresetName || undefined}
              onChange={(value) => value && handlePresetChange(value)}
              style={{ minWidth: 200 }}
              styles={{
                option: {
                  color: "black",
                },
              }}
            />
            <Group>
              <Switch
                checked={currentTheme === "dark"}
                onChange={() =>
                  setCurrentTheme((prev) =>
                    prev === "light" ? "dark" : "light",
                  )
                }
                label={currentTheme === "light" ? "Light" : "Dark"}
                onLabel={<IconSun size={16} />}
                offLabel={<IconMoon size={16} />}
              />
              <Switch
                checked={applyToWebsite}
                onChange={(event) =>
                  setApplyToWebsite(event.currentTarget.checked)
                }
                label="Apply to website"
              />
            </Group>
          </Group>

          <Group grow>
            <Button
              leftSection={<IconArrowsLeftRight size={20} />}
              onClick={handleCompare}
            >
              Compare with Preset
            </Button>
            <Button
              leftSection={<IconPalette size={20} />}
              onClick={handleGeneratePalette}
            >
              Generate Color Palette
            </Button>
          </Group>

          <Group grow>
            <Button leftSection={<IconShare size={20} />} onClick={shareTheme}>
              Share Theme
            </Button>
            <Button
              leftSection={<IconMoon size={20} />}
              onClick={syncDarkTheme}
            >
              Sync Dark Theme
            </Button>
            <Button
              leftSection={<IconArrowLeft size={20} />}
              onClick={undo}
              disabled={!canUndo}
            >
              Undo
            </Button>
            <Button
              leftSection={<IconArrowRight size={20} />}
              onClick={redo}
              disabled={!canRedo}
            >
              Redo
            </Button>
          </Group>

          {shareURL && (
            <TextInput
              label="Share URL"
              value={shareURL}
              readOnly
              onClick={(event) => event.currentTarget.select()}
              leftSection={<IconShare size={16} />}
            />
          )}
          <DownloadSection
            setThemeName={setThemeName}
            lightTheme={currentThemes.light}
            darkTheme={currentThemes.dark}
            setLightTheme={(theme) => addToHistory(theme, currentThemes.dark)}
            setDarkTheme={(theme) => addToHistory(currentThemes.light, theme)}
            themeName={themeName}
          />
          <Group justify="space-around">
            <ThemeControls
              theme={currentThemes[currentTheme]}
              updateTheme={updateTheme}
            />

            <DetailedThemePreview
              theme={currentThemes[currentTheme]}
              name="Current Theme"
            />
          </Group>
          <AccessibilityWarnings warnings={accessibilityWarnings} />
        </Stack>
      </Container>

      {/* <LivePreview theme={currentThemes[currentTheme]} /> */}

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
    </Box>
  );
}
