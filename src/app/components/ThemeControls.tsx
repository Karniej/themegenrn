/** @format */

"use_client";

import React from "react";
import { Stack } from "@mantine/core";
import ColorPicker from "./ColorPicker";
import { Theme } from "../utils/presets";

interface ThemeControlsProps {
  theme: Theme;
  updateTheme: (key: keyof Theme["colors"], value: string) => void;
}

export default function ThemeControls({
  theme,
  updateTheme,
}: ThemeControlsProps) {
  return (
    <Stack>
      {Object.entries(theme.colors).map(([key, value]) => (
        <ColorPicker
          key={key}
          colorKey={key as keyof Theme["colors"]}
          value={value}
          onChange={updateTheme}
        />
      ))}
    </Stack>
  );
}
