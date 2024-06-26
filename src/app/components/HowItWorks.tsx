/** @format */

import { Card, Title, Text } from "@mantine/core";

export function HowItWorks() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder my="xl">
      <Title order={3} mb="md">
        How it Works
      </Title>
      <Text>
        1. Choose a preset or start from scratch
        <br />
        2. Customize colors, fonts, and other properties
        <br />
        3. Preview your theme in real-time
        <br />
        4. Export your theme and use it in your React Native project
      </Text>
    </Card>
  );
}
