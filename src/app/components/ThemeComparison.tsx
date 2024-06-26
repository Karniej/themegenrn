/** @format */

import React, { useState } from "react";
import {
  Group,
  Stack,
  Title,
  Paper,
  Text,
  Select,
  Switch,
  useMantineTheme,
  SimpleGrid,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import DetailedThemePreview from "./DetailedThemePreview";
import { Theme } from "../types/mantineTheme";
import { useThemeContext } from "../store/themeContext";

interface ThemeComparisonProps {
  currentTheme: Theme;
  presets: Record<string, { light: Theme; dark: Theme }>;
  currentThemeName: string;
  onThemeModeChange: (isDark: boolean) => void;
}

export default function ThemeComparison({
  currentTheme,
  presets,
  currentThemeName,
  onThemeModeChange,
}: ThemeComparisonProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const { applyToWebsite, theme, setCurrentTheme } = useThemeContext();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const mantineTheme = useMantineTheme();
  const isDarkMode = theme.dark;
  const isMobile = useMediaQuery(`(max-width: ${mantineTheme.breakpoints.sm})`);
  const handleSwitch = () => {
    setCurrentTheme(colorScheme === "dark" ? "light" : "dark");
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };
  // const handleThemeModeChange = (checked: boolean) => {
  //   setIsDarkMode(checked);
  //   onThemeModeChange(checked);
  // };

  const getDifferences = (t1: Theme, t2: Theme) => {
    const differences: string[] = [];
    Object.entries(t1.colors).forEach(([key, value]) => {
      if (value !== t2.colors[key as keyof Theme["colors"]]) {
        differences.push(
          `${key}: ${value} → ${t2.colors[key as keyof Theme["colors"]]}`,
        );
      }
    });
    return differences;
  };

  const presetTheme = selectedPreset
    ? presets[selectedPreset][isDarkMode ? "dark" : "light"]
    : null;
  const differences = presetTheme
    ? getDifferences(presetTheme, currentTheme)
    : [];

  return (
    <Paper
      p={isMobile ? "xs" : "xl"}
      radius="md"
      style={{
        backgroundColor: applyToWebsite
          ? mantineTheme.colors.background
          : mantineTheme.colors[colorScheme],
        color: applyToWebsite
          ? mantineTheme.colors.text
          : mantineTheme.colors[colorScheme],
        boxShadow: mantineTheme.shadows.sm,
      }}
    >
      <Stack p={isMobile ? "xs" : "md"}>
        <Title
          order={2}
          style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Theme Comparison
        </Title>

        <Stack p={isMobile ? "xs" : "md"}>
          <Select
            placeholder="Select preset for comparison"
            data={Object.keys(presets)}
            value={selectedPreset}
            onChange={setSelectedPreset}
            style={{ width: "100%" }}
          />
          <Switch
            label="Dark Mode"
            checked={isDarkMode}
            onChange={handleSwitch}
            styles={{
              label: { color: mantineTheme.colors.dark[6] },
            }}
          />
        </Stack>

        {selectedPreset && (
          <SimpleGrid cols={isMobile ? 1 : 2} spacing={isMobile ? "xs" : "md"}>
            <Box>
              <Title
                order={3}
                style={{
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                {selectedPreset} Preset
              </Title>
              <DetailedThemePreview
                theme={presetTheme!}
                name={selectedPreset}
              />
            </Box>
            <Box>
              <Title
                order={3}
                style={{
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                {currentThemeName}
              </Title>
              <DetailedThemePreview theme={currentTheme} name="Your Preset" />
            </Box>
          </SimpleGrid>
        )}

        {selectedPreset && differences.length > 0 && (
          <Paper p={isMobile ? "xs" : "md"} radius="sm">
            <Title
              order={3}
              style={{
                marginBottom: mantineTheme.spacing.sm,
                fontSize: isMobile ? "1.2rem" : "1.5rem",
              }}
            >
              Differences
            </Title>
            {differences.map((diff, index) => (
              <Text
                key={index}
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                {diff}
              </Text>
            ))}
          </Paper>
        )}

        {selectedPreset && differences.length === 0 && (
          <Paper p={isMobile ? "xs" : "md"} radius="sm">
            <Text
              style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              No differences found.
            </Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}
