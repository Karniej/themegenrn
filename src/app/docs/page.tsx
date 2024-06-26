/** @format */
"use client";

import {
  Container,
  Title,
  Text,
  Tabs,
  useMantineTheme,
  List,
  Modal,
} from "@mantine/core";

import CodeBlock from "../components/CodeBlock";
import {
  presetsString,
  themeContextString,
  themeUsageExampleString,
  themedComponentsString,
} from "../constants/codeSamples";
import { useThemeContext } from "../store/themeContext";
import { useCallback, useEffect, useState } from "react";
import { ShareModal } from "../components/ShareModal";

export default function Docs() {
  const { applyToWebsite, theme } = useThemeContext();
  const [showShareModal, setShowShareModal] = useState(false);

  const mantineTheme = useMantineTheme();

  const appliedTheme = applyToWebsite ? theme : mantineTheme;
  const handleCopy = useCallback(() => {
    if (Math.random() < 0.3) {
      // 30% chance to show the modal on copy
      setShowShareModal(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [handleCopy]);

  return (
    <Container
      size="lg"
      //@ts-ignore
      style={{
        backgroundColor: appliedTheme.colors.background,
        minHeight: "100vh",
        padding: mantineTheme.spacing.xs,
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
          <Tabs.Tab value="presets">Presets</Tabs.Tab>
          <Tabs.Tab value="example">Usage Example</Tabs.Tab>
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
        <Tabs.Panel value="presets" pt="xs">
          <Title order={3} mb="md">
            Presets
          </Title>
          <Text mb="md">Copy and paste this code with presets.</Text>
          <CodeBlock code={presetsString} language="typescript" />
        </Tabs.Panel>
        <Tabs.Panel value="example" pt="xs">
          <Title order={3} mb="md">
            Usage Example
          </Title>
          <Text mb="md">Copy and paste this code with presets.</Text>
          <CodeBlock code={themeUsageExampleString} language="typescript" />
        </Tabs.Panel>
      </Tabs>
      <ShareModal
        opened={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </Container>
  );
}
