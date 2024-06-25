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
  SimpleGrid,
  ActionIcon,
} from "@mantine/core";
import { Theme } from "../utils/presets";
import {
  IconBrandGithubFilled,
  IconBrandXFilled,
  IconHome,
  IconMail,
  IconPalette,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

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
        <List p="sm" size="sm" center>
          <List.Item
            py="sm"
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text>Item 1</Text>
          </List.Item>
          <List.Item
            py="sm"
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text>Item 2</Text>
          </List.Item>
          <List.Item
            py="sm"
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
          <SimpleGrid cols={4} p="md">
            <ActionIcon size="lg" variant="transparent">
              <IconHome color={theme.colors.primary} size={30} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="transparent">
              <IconSearch color={theme.colors.text} size={30} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="transparent">
              <IconUser color={theme.colors.text} size={30} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="transparent">
              <IconSettings color={theme.colors.text} size={30} stroke={1.5} />
            </ActionIcon>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Paper>
  );
}
