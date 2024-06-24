/** @format */
"use_client";

import React from "react";
import {
  Paper,
  Text,
  Button,
  Stack,
  Group,
  Card,
  useMantineTheme,
} from "@mantine/core";
import { Theme } from "../utils/presets";

interface DetailedThemePreviewProps {
  theme: Theme;
  name: string;
}

export default function DetailedThemePreview({
  theme,
  name,
}: DetailedThemePreviewProps) {
  const mantineTheme = useMantineTheme();

  return (
    <Paper
      p="xl"
      radius="md"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        overflow: "hidden",
        boxShadow: mantineTheme.shadows.md,
      }}
    >
      <Stack p="md">
        <Text size="xl" style={{ fontWeight: 700 }} mb="md">
          {name}
        </Text>

        {/* Header */}
        <Paper
          p="md"
          radius="sm"
          style={{
            backgroundColor: theme.colors.card,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group justify="space-between">
            <Text style={{ fontWeight: 500 }}>Header</Text>
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
        <Stack p="md">
          <Card
            p="md"
            radius="sm"
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            }}
          >
            <Text>Card Content</Text>
          </Card>
          <Group>
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
          </Group>
        </Stack>

        {/* Tab Bar */}
        <Paper
          p="md"
          radius="sm"
          style={{
            backgroundColor: theme.colors.card,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group justify="space-between">
            <Text>Tab 1</Text>
            <Text>Tab 2</Text>
            <Text style={{ color: theme.colors.primary }}>Tab 3</Text>
          </Group>
        </Paper>

        {/* Notification */}
        <Paper
          p="sm"
          radius="sm"
          style={{
            backgroundColor: theme.colors.notification,
            color: theme.colors.background,
          }}
        >
          <Text style={{ fontWeight: 500 }}>Notification Message</Text>
        </Paper>
      </Stack>
    </Paper>
  );
}
