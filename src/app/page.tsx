/** @format */
"use client";
import {
  Container,
  Stack,
  Button,
  Group,
  Switch,
  Select,
  Modal,
  Box,
  SimpleGrid,
  ActionIcon,
  useMantineTheme,
  Burger,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconPalette,
  IconArrowLeft,
  IconArrowRight,
  IconArrowsLeftRight,
  IconMail,
  IconBrandGithubFilled,
  IconBrandXFilled,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import AccessibilityWarnings from "./components/AccessibilityWarnings";
import ThemeControls from "./components/ThemeControls";
import DownloadSection from "./components/DownloadSection";
import DetailedThemePreview from "./components/DetailedThemePreview";
import ThemeComparison from "./components/ThemeComparison";
import { useMediaQuery } from "@mantine/hooks";
import { presets } from "./constants/presets";
import { useThemeContext } from "./store/themeContext";

export default function Home() {
  const {
    themeName,
    setThemeName,
    currentThemes,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    handleCompare,
    handleGeneratePalette,
    shareTheme,
    showComparison,
    setShowComparison,
    accessibilityWarnings,
    updateTheme,
    applyToWebsite,
    shareURL,
    theme,
    setCurrentTheme,
    menuOpened,
    setMenuOpened,
    currPresetName,
    handlePresetChange,
    setApplyToWebsite,
  } = useThemeContext();

  const mantineTheme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${mantineTheme.breakpoints.sm})`);
  const currentTheme = applyToWebsite ? theme : mantineTheme;
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const handleSwitch = () => {
    setCurrentTheme(colorScheme === "dark" ? "light" : "dark");
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };
  return (
    <Container
      size="lg"
      //@ts-ignore
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
        minHeight: "100vh",
        padding: mantineTheme.spacing.xs,
      }}
    >
      <Title order={1} ta="center" my="xl">
        Theme Generator
      </Title>
      <Group justify="center" mb="xl">
        <Switch
          checked={theme.dark}
          onChange={handleSwitch}
          label={theme.dark ? "Dark" : "Light"}
          onLabel={<IconSun size={16} />}
          offLabel={<IconMoon size={16} />}
        />
        <Switch
          checked={applyToWebsite}
          onChange={(event) => setApplyToWebsite(event.currentTarget.checked)}
          label="Apply to website"
        />
      </Group>
      <Stack>
        <SimpleGrid cols={isMobile ? 1 : 5} mb={isMobile ? "xs" : "lg"}>
          <Select
            placeholder="Choose a preset"
            data={Object.keys(presets)}
            value={currPresetName || undefined}
            onChange={(value) => value && handlePresetChange(value)}
            style={{ minWidth: 200 }}
          />
          <Button
            leftSection={<IconArrowsLeftRight size={20} />}
            onClick={handleCompare}
            variant="gradient"
          >
            Compare
          </Button>
          <Button
            variant="gradient"
            leftSection={<IconPalette size={20} />}
            onClick={handleGeneratePalette}
          >
            Generate
          </Button>
          <Button
            leftSection={<IconArrowLeft size={20} />}
            onClick={undo}
            disabled={!canUndo}
            variant="subtle"
          >
            Undo
          </Button>
          <Button
            leftSection={<IconArrowRight size={20} />}
            onClick={redo}
            disabled={!canRedo}
            variant="subtle"
          >
            Redo
          </Button>
        </SimpleGrid>

        <DownloadSection />
        <SimpleGrid cols={isMobile ? 1 : 2} spacing="md" mt="xl">
          <ThemeControls />
          <Box>
            <DetailedThemePreview theme={theme} name="Current Theme" />
          </Box>
        </SimpleGrid>
        <AccessibilityWarnings warnings={accessibilityWarnings} />
      </Stack>
      <Group p="md" justify="center">
        <ActionIcon
          size="lg"
          component="a"
          variant="transparent"
          color={theme.colors.primary}
          href="https://x.com/pawelkarniej"
          target="_blank"
        >
          <IconBrandXFilled size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          component="a"
          color={theme.colors.primary}
          href="mailto:karniej.p@gmail.com"
        >
          <IconMail size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          color={theme.colors.primary}
          component="a"
          href="https://github.com/Karniej"
          target="_blank"
        >
          <IconBrandGithubFilled size={18} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Modal
        opened={showComparison}
        onClose={() => setShowComparison(false)}
        size={isMobile ? "md" : 1000}
      >
        <ThemeComparison />
      </Modal>
    </Container>
  );
}
