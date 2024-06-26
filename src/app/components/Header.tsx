/** @format */
"use client";
import {
  Button,
  Image,
  Title,
  Text,
  SimpleGrid,
  Stack,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBook, IconPalette } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";

export default function Header() {
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Stack align="center" p="xs" mb="xl">
      <Image
        src="/logo.png"
        alt="Logo"
        mt="xl"
        style={{
          width: isMobile ? "60px" : "100px",
          height: "auto",
          margin: "0 auto",
        }}
      />
      <Title
        order={1}
        ta="center"
        style={{
          fontSize: isMobile ? "1.5rem" : "2rem",
        }}
      >
        React Navigation Theme Generator
      </Title>
      <Text ta="center" size={isMobile ? "sm" : "md"}>
        Create and customize dependency-free themes for React Native
      </Text>
      <SimpleGrid cols={2}>
        <Button
          variant="gradient"
          leftSection={<IconPalette size={20} />}
          onClick={() => router.push("/")}
        >
          ThemeGen
        </Button>
        <Button
          variant="gradient"
          leftSection={<IconBook size={20} />}
          onClick={() => router.push("/docs")}
        >
          Docs
        </Button>
      </SimpleGrid>
    </Stack>
  );
}
