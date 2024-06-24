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
  List,
  Avatar,
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
        maxWidth: 400,
        margin: "0 auto",
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

        {/* List of items */}
        <List spacing="sm" size="sm" center>
          <List.Item
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text>Item 1</Text>
          </List.Item>
          <List.Item
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text>Item 2</Text>
          </List.Item>
          <List.Item
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text>Item 3</Text>
          </List.Item>
        </List>

        {/* Footer */}
        <Paper
          p="md"
          radius="sm"
          style={{
            backgroundColor: theme.colors.card,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group justify="space-between">
            <Text>Footer</Text>
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
      </Stack>
    </Paper>
  );
}
