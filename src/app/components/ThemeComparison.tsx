/** @format */

import React from "react";
import { Group, Stack, Title } from "@mantine/core";
import { Theme } from "../utils/presets";
import DetailedThemePreview from "./DetailedThemePreview";

interface ThemeComparisonProps {
  theme1: Theme;
  theme2: Theme;
  theme1Name: string;
  theme2Name: string;
}

export default function ThemeComparison({
  theme1,
  theme2,
  theme1Name,
  theme2Name,
}: ThemeComparisonProps) {
  return (
    <Stack>
      <Title order={2}>Theme Comparison</Title>
      <Group grow>
        <Stack>
          <Title order={3}>{theme1Name}</Title>
          <DetailedThemePreview theme={theme1} />
        </Stack>
        <Stack>
          <Title order={3}>{theme2Name}</Title>
          <DetailedThemePreview theme={theme2} />
        </Stack>
      </Group>
    </Stack>
  );
}
