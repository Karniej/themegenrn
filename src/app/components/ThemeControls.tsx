/** @format */

import React from "react";
import {
  Stack,
  Text,
  Group,
  ColorInput,
  useMantineTheme,
  Paper,
  ColorPicker,
} from "@mantine/core";
import { Theme } from "../utils/themeUtils";

interface ThemeControlsProps {
  theme: Theme;
  updateTheme: (key: keyof Theme["colors"], value: string) => void;
}

export default function ThemeControls({
  theme,
  updateTheme,
}: ThemeControlsProps) {
  const mantineTheme = useMantineTheme();

  return (
    <Paper
      p="md"
      radius="md"
      style={{ backgroundColor: mantineTheme.colors.gray[1] }}
    >
      <Stack p="md">
        <Text size="xl" style={{ fontWeight: 700 }}>
          Theme Colors
        </Text>
        {Object.entries(theme.colors).map(([key, value]) => (
          <Group key={key} justify="space-between" align="center">
            <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <ColorInput
              value={value}
              onChange={(color) =>
                updateTheme(key as keyof Theme["colors"], color)
              }
              format="hex"
              swatches={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
