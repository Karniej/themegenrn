/** @format */

import { Card, Title, List, ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export function Features() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Title order={3} mb="md">
        Why use Theme Generator?
      </Title>
      <List
        spacing="sm"
        size="sm"
        center
        icon={
          <ThemeIcon size={24} radius="xl">
            <IconCheck size="1rem" />
          </ThemeIcon>
        }
      >
        <List.Item>Quickly generate custom themes for React Native</List.Item>
        <List.Item>
          Ensure accessibility with built-in contrast checking
        </List.Item>
        <List.Item>Compare your theme with presets</List.Item>
        <List.Item>Easy export and integration with your projects</List.Item>
      </List>
    </Card>
  );
}
