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
} from "@mantine/core";
import DetailedThemePreview from "./DetailedThemePreview";
import { Theme } from "../utils/presets";

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
  const [isDarkMode, setIsDarkMode] = useState(currentTheme.dark);
  const theme = useMantineTheme();

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
    <Paper p="xl" radius="md" style={{ backgroundColor: theme.colors.gray[0] }}>
      <Stack p="md">
        <Title order={2} style={{ color: theme.colors.dark[6] }}>
          Theme Comparison
        </Title>

        <Group align="flex-end">
          <Select
            label="Select preset for comparison"
            data={Object.keys(presets)}
            value={selectedPreset}
            onChange={setSelectedPreset}
            style={{ flex: 1 }}
            styles={{
              label: { color: "black" },
              option: { color: "black" },
              wrapper: { color: "black" },
            }}
          />
          <Switch
            label="Dark Mode"
            checked={isDarkMode}
            onChange={(event) =>
              handleThemeModeChange(event.currentTarget.checked)
            }
            styles={{
              label: { color: theme.colors.dark[6] },
            }}
          />
        </Group>

        {selectedPreset && (
          <Group grow>
            <Stack>
              <Title order={3} style={{ color: theme.colors.dark[6] }}>
                {selectedPreset} Preset
              </Title>
              <DetailedThemePreview
                theme={presetTheme!}
                name={selectedPreset}
              />
            </Stack>
            <Stack>
              <Title order={3} style={{ color: theme.colors.dark[6] }}>
                {currentThemeName}
              </Title>
              <DetailedThemePreview theme={currentTheme} name="Your Preset" />
            </Stack>
          </Group>
        )}

        {selectedPreset && differences.length > 0 && (
          <Paper
            p="md"
            radius="sm"
            style={{ backgroundColor: theme.colors.gray[1] }}
          >
            <Title
              order={3}
              style={{
                color: theme.colors.dark[6],
                marginBottom: theme.spacing.sm,
              }}
            >
              Differences
            </Title>
            {differences.map((diff, index) => (
              <Text key={index} style={{ color: theme.colors.dark[6] }}>
                {diff}
              </Text>
            ))}
          </Paper>
        )}

        {selectedPreset && differences.length === 0 && (
          <Paper
            p="md"
            radius="sm"
            style={{ backgroundColor: theme.colors.gray[1] }}
          >
            <Text style={{ color: theme.colors.dark[6] }}>
              No differences found.
            </Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}
