/** @format */

import React from "react";
import {
  Paper,
  Text,
  Button,
  Stack,
  Group,
  List,
  Avatar,
  SimpleGrid,
  ActionIcon,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { Theme, ViewStyle } from "../types/theme";
import {
  IconHome,
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
  function viewStyleToBoxShadow(viewStyle: ViewStyle): string {
    const { shadowOffset, shadowOpacity, shadowRadius, elevation } = viewStyle;
    return `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity}), 0px ${elevation}px ${elevation}px rgba(0, 0, 0, ${shadowOpacity})`;
  }

  return (
    <Paper
      p="0"
      radius={theme.roundness.md} // Use theme.roundness
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        ...theme.shadows.md,
        margin: "0 auto",
        boxShadow: viewStyleToBoxShadow(theme.shadows.sm),
      }}
    >
      <Stack p="md">
        <Paper
          p="md"
          radius={theme.roundness.sm} // Use theme.roundness
          style={{
            backgroundColor: theme.colors.card,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <Group justify="space-between">
            <Text style={{ fontWeight: 500, fontSize: theme.fontSizes.md }}>
              Header
            </Text>
            <Button
              size="sm"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                borderRadius: theme.roundness.xs, // Use theme.roundness
              }}
            >
              Action
            </Button>
          </Group>
        </Paper>

        {/* Success and Error examples */}
        <Group justify="center" grow>
          <Badge
            p="sm"
            radius={theme.roundness.sm} // Use theme.roundness
            style={{
              backgroundColor: theme.colors.success,
              ...theme.shadows.sm,
            }}
          >
            <Text fs="sm" style={{ color: theme.colors.background }}>
              Success
            </Text>
          </Badge>
          <Badge
            p="sm"
            radius={theme.roundness.sm} // Use theme.roundness
            style={{
              backgroundColor: theme.colors.error,
              ...theme.shadows.sm,
            }}
          >
            <Text fs="sm" style={{ color: theme.colors.background }}>
              Error
            </Text>
          </Badge>
        </Group>

        {/* List of items */}
        <List p="sm" fs="sm" center h={430}>
          <List.Item
            py="sm"
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text fs="sm" style={{ fontSize: theme.fontSizes.sm }}>
              Item 1
            </Text>
          </List.Item>
          <List.Item
            py="sm"
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text fs="sm" style={{ fontSize: theme.fontSizes.sm }}>
              Item 2
            </Text>
          </List.Item>
          <List.Item
            py="sm"
            icon={<Avatar src="https://via.placeholder.com/40" radius="xl" />}
          >
            <Text fs="sm" style={{ fontSize: theme.fontSizes.sm }}>
              Item 3
            </Text>
          </List.Item>
        </List>

        {/* Footer */}
        <Paper
          p="md"
          radius={theme.roundness.sm} // Use theme.roundness
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
