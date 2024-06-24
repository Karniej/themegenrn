/** @format */

import React from "react";
import {
  Stack,
  Text,
  Group,
  ColorInput,
  useMantineTheme,
  Paper,
  Title,
} from "@mantine/core";
import { Theme } from "../utils/presets";

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
      p="xl"
      radius="md"
      style={{
        backgroundColor: mantineTheme.colors.gray[0],
        boxShadow: mantineTheme.shadows.sm,
      }}
    >
      <Stack p="md">
        <Title order={2} style={{ color: mantineTheme.colors.dark[6] }}>
          Theme Colors
        </Title>
        {Object.entries(theme.colors).map(([key, value]) => (
          <Group key={key} justify="space-between" align="center">
            <Text
              style={{
                color: mantineTheme.colors.dark[6],
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {key}
            </Text>
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
              styles={{
                input: { width: "120px" },
                preview: { boxShadow: mantineTheme.shadows.sm },
              }}
            />
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
