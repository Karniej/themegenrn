/** @format */

import React from "react";
import { Paper, Button, Text, Stack } from "@mantine/core";

interface LivePreviewProps {
  theme: any;
}

export function LivePreview({ theme }: LivePreviewProps) {
  return (
    <Paper
      p={theme.space.md}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
      }}
    >
      <Stack>
        <Text size="xl" weight={700}>
          Live Preview
        </Text>
        <Button
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            borderRadius: theme.radius.sm,
            padding: `${theme.space.sm}px ${theme.space.md}px`,
            transition: `all ${theme.animations.fast}`,
          }}
        >
          Sample Button
        </Button>
        <Paper
          p={theme.space.sm}
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadows.sm,
          }}
        >
          <Text>Sample Card</Text>
        </Paper>
      </Stack>
    </Paper>
  );
}
