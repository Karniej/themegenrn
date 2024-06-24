/** @format */

import React from "react";
import { Paper, Text, Button, Stack, Group, Card } from "@mantine/core";
import { Theme } from "../utils/presets";

interface DetailedThemePreviewProps {
  theme: Theme;
}

export default function DetailedThemePreview({
  theme,
}: DetailedThemePreviewProps) {
  return (
    <Paper
      p="md"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <Stack spacing="md">
        <Text size="xl" weight={700}>
          Detailed Theme Preview
        </Text>

        {/* Header */}
        <Paper
          p="sm"
          style={{
            backgroundColor: theme.colors.card,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group position="apart">
            <Text>Header</Text>
            <Button
              size="sm"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              Action
            </Button>
          </Group>
        </Paper>

        {/* Content */}
        <Stack spacing="sm">
          <Card
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            }}
          >
            <Text>Card Content</Text>
          </Card>
          <Button
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            Primary Button
          </Button>
          <Button
            variant="outline"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
            }}
          >
            Secondary Button
          </Button>
        </Stack>

        {/* Tab Bar */}
        <Paper
          p="sm"
          style={{
            backgroundColor: theme.colors.card,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group position="apart">
            <Text>Tab 1</Text>
            <Text>Tab 2</Text>
            <Text style={{ color: theme.colors.primary }}>Tab 3</Text>
          </Group>
        </Paper>

        {/* Notification */}
        <Paper
          p="xs"
          style={{
            backgroundColor: theme.colors.notification,
            color: theme.colors.background,
          }}
        >
          <Text>Notification Message</Text>
        </Paper>
      </Stack>
    </Paper>
  );
}
