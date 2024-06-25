/** @format */
"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Tabs,
  Box,
  useMantineTheme,
  List,
} from "@mantine/core";

import { useThemeHistory } from "./hooks/useThemeHistory";
import { presets } from "./constants/presets";
import { useLocation } from "react-router-dom";
import CodeBlock from "./components/CodeBlock";
import {
  themeContextString,
  themeUsageExampleString,
  themedComponentsString,
} from "./constants/codeSamples";

export function DocsPage() {
  const { currentThemes } = useThemeHistory(
    presets.Gruvbox.light,
    presets.Gruvbox.dark,
  );

  const mantineTheme = useMantineTheme();
  const location = useLocation();
  const { theme, isApplyToWebsite } = location.state || {};

  const appliedTheme = isApplyToWebsite ? theme : mantineTheme;

  return (
    <Container
      size="lg"
      style={{
        backgroundColor: isApplyToWebsite
          ? appliedTheme.colors.background
          : undefined,
        color: isApplyToWebsite ? appliedTheme.colors.text : undefined,
      }}
    >
      <Title order={1} ta="center" my="xl">
        Documentation
      </Title>

      <Title order={2} mb="md">
        What is Themegen?
      </Title>
      <Text>
        Themegen is a powerful appliedTheme generator for React Native
        applications using React Navigation. It allows you to create, customize,
        and manage themes with ease, providing a consistent look and feel across
        your entire app.
      </Text>
      <Title order={2} mb="md" mt="xl">
        Features
      </Title>
      <Text component="div">
        <List>
          <List.Item>
            Create custom themes with a wide range of color options
          </List.Item>
          <List.Item>Manage font sizes, roundness, and shadows</List.Item>
          <List.Item>Generate accessible color palettes</List.Item>
          <List.Item>Easy integration with React Navigation</List.Item>
          <List.Item>
            Themed components for common React Native elements
          </List.Item>
          <List.Item>Dark mode support</List.Item>
        </List>
      </Text>

      <Title order={2} mb="md" mt="xl">
        How to Use Themegen
      </Title>
      <Text mb="md">
        Follow these steps to integrate Themegen into your React Native project:
      </Text>
      <Text component="div">
        <List variant="ordered">
          <List.Item>Copy the ThemeContext code into your project.</List.Item>
          <List.Item>Wrap your app with the ThemeProvider.</List.Item>
          <List.Item>Use the themed components in your app.</List.Item>
          <List.Item>
            Customize your appliedTheme using the Themegen interface.
          </List.Item>
        </List>
      </Text>

      <Tabs defaultValue="themed" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="themed">Themed Components</Tabs.Tab>
          <Tabs.Tab value="context">Theme Context</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="themed" pt="xs">
          <Title order={3} mb="md">
            Themed Components
          </Title>
          <Text mb="md">
            Copy and paste this code into your project to use the themed
            components:
          </Text>
          <CodeBlock code={themedComponentsString} language="typescript" />
        </Tabs.Panel>

        <Tabs.Panel value="context" pt="xs">
          <Title order={3} mb="md">
            Theme Context
          </Title>
          <Text mb="md">
            Copy and paste this code to set up the Theme Context in your
            project:
          </Text>
          <CodeBlock code={themeContextString} language="typescript" />
        </Tabs.Panel>
      </Tabs>

      <Title order={2} mb="md">
        Usage Example
      </Title>
      <Text mb="md">
        Here&apos;s a simple example of how to use Themegen in your app:
      </Text>
      <CodeBlock code={themeUsageExampleString} language="typescript" />
    </Container>
  );
}
