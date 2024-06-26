/** @format */

import {
  Modal,
  Text,
  Stack,
  Button,
  Title,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandTwitter,
  IconBrandX,
} from "@tabler/icons-react";
import { useThemeContext } from "../store/themeContext";

interface ShareModalProps {
  opened: boolean;
  onClose: () => void;
}

export function ShareModal({ opened, onClose }: ShareModalProps) {
  const { applyToWebsite, theme } = useThemeContext();
  const mantineTheme = useMantineTheme();
  const currentTheme = applyToWebsite ? theme : mantineTheme;

  return (
    <Modal opened={opened} onClose={onClose} size="lg">
      <Stack>
        <Title fw={700} ta="center" mb="md">
          Thank you for using Theme Generator!
        </Title>
        <Text ta="center" mb="md">
          I hope you found it useful for your React Native projects.
        </Text>
        <Stack>
          <Group justify="center">
            <Button
              component="a"
              href="https://github.com/Karniej/themegenrn"
              target="_blank"
              color="black"
              leftSection={<IconBrandGithubFilled />}
            >
              Star on GitHub
            </Button>
            <Button
              component="a"
              variant="gradient"
              href="https://twitter.com/pawelkarniej"
              target="_blank"
              color="blue"
              leftSection={<IconBrandX />}
            >
              🐦 Follow me on X
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Modal>
  );
}
