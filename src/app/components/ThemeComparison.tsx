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
} from "@mantine/core";
import { Theme } from "../utils/themeUtils";
import DetailedThemePreview from "./DetailedThemePreview";

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
  console.log(currentTheme);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(currentTheme.dark);

  const handleThemeModeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    onThemeModeChange(checked);
  };

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
    <Paper p="md">
      <Stack spacing="md">
        <Title style={{ color: "black" }} order={2}>
          Theme Comparison
        </Title>

        <Group>
          <Select
            label="Select preset for comparison"
            data={Object.keys(presets)}
            value={selectedPreset}
            onChange={setSelectedPreset}
            style={{ flex: 1, color: "black" }}
            styles={{
              label: { color: "black" },
              input: { color: "black" },
            }}
            scrollAreaProps={{ style: { color: "black" } }}
          />
          <Switch
            label="Dark Mode"
            checked={isDarkMode}
            onChange={(event) =>
              handleThemeModeChange(event.currentTarget.checked)
            }
          />
        </Group>

        {selectedPreset && (
          <Group grow>
            <Stack>
              <Title order={3}>{selectedPreset} Preset</Title>
              <DetailedThemePreview
                theme={presetTheme!}
                name={selectedPreset}
              />
            </Stack>
            <Stack>
              <Title order={3}>{currentThemeName}</Title>
              <DetailedThemePreview theme={currentTheme} name="Your Preset" />
            </Stack>
          </Group>
        )}

        {selectedPreset && (
          <>
            <Title order={3}>Differences</Title>
            {differences.length > 0 ? (
              differences.map((diff, index) => <Text key={index}>{diff}</Text>)
            ) : (
              <Text>No differences found.</Text>
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}
