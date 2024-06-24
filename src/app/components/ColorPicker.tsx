/** @format */
"use_client";

import React from "react";
import {
  Group,
  Text,
  Button,
  ColorPicker as MantineColorPicker,
} from "@mantine/core";
import { Theme } from "../utils/presets";
import { generateHarmonies } from "../utils/colorUtils";

interface ColorPickerProps {
  colorKey: keyof Theme["colors"];
  value: string;
  onChange: (key: keyof Theme["colors"], value: string) => void;
}

export default function ColorPicker({
  colorKey,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <Group>
      <MantineColorPicker
        format="rgb"
        value={value}
        onChange={(color) => onChange(colorKey, color)}
      />
      <Text>{colorKey}</Text>
      <Button
        onClick={() => onChange(colorKey, generateHarmonies(value).analogous)}
      >
        Analogous
      </Button>
      <Button
        onClick={() => onChange(colorKey, generateHarmonies(value).complement)}
      >
        Complement
      </Button>
      <Button
        onClick={() => onChange(colorKey, generateHarmonies(value).triadic)}
      >
        Triadic
      </Button>
    </Group>
  );
}
