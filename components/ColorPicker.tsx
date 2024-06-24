/** @format */

import React from "react";
import { Input, YStack, Text } from "tamagui";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <YStack space>
      <Input value={value} onChangeText={onChange} placeholder="#RRGGBB" />
      <Text>Preview:</Text>
      <YStack h={50} bg={value} br="$2" />
    </YStack>
  );
}
