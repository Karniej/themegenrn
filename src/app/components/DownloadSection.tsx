/** @format */
"use_client";

import React, { useState, useRef } from "react";
import { Stack, TextInput, Button, Group, Tooltip } from "@mantine/core";
import { Theme } from "../types/theme";
import {
  IconCopy,
  IconDownload,
  IconShare,
  IconUpload,
} from "@tabler/icons-react";

interface DownloadSectionProps {
  themeName: string;
  setThemeName: (name: string) => void;
  lightTheme: Theme;
  darkTheme: Theme;
  setLightTheme: (theme: Theme) => void;
  setDarkTheme: (theme: Theme) => void;
  shareTheme: () => void;
  shareURL: string;
}

export default function DownloadSection({
  themeName,
  setThemeName,
  lightTheme,
  darkTheme,
  setLightTheme,
  setDarkTheme,
  shareTheme,
  shareURL,
}: DownloadSectionProps) {
  // const [email, setEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copyIndicator, setCopyIndicator] = useState(false);
  const handleExport = () => {
    const themes = {
      [themeName]: {
        light: lightTheme,
        dark: darkTheme,
      },
    };
    const jsonString = JSON.stringify(themes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${themeName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedThemes = JSON.parse(content);
          const themeName = Object.keys(importedThemes)[0];
          setThemeName(themeName);
          setLightTheme(importedThemes[themeName].light);
          setDarkTheme(importedThemes[themeName].dark);
        } catch (error) {
          console.error("Error parsing imported theme:", error);
          alert("Failed to import theme. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL).then(() => {
      setCopyIndicator(true);
      setTimeout(() => setCopyIndicator(false), 2000); // Hide after 2 seconds
    });
  };

  return (
    <Stack>
      {/* <TextInput
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      /> */}
      <Group align="flex-end">
        <TextInput
          label="Theme Name"
          value={themeName}
          onChange={(e) => setThemeName(e.currentTarget.value)}
        />
        <Button
          leftSection={<IconDownload size={20} />}
          variant="gradient"
          onClick={handleExport}
        >
          Export
        </Button>
        <Button
          leftSection={<IconUpload size={20} />}
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Import
        </Button>
        <Button
          variant="gradient"
          leftSection={<IconShare size={20} />}
          onClick={shareTheme}
        >
          Share
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
          accept=".json"
        />
      </Group>
      {shareURL && (
        <TextInput
          label="Share URL"
          value={shareURL}
          readOnly
          onClick={(event) => event.currentTarget.select()}
          leftSection={<IconShare size={16} />}
          rightSection={
            <Tooltip
              label="Copied!"
              opened={copyIndicator}
              position="top"
              withArrow
            >
              <IconCopy size={16} onClick={handleCopy} />
            </Tooltip>
          }
        />
      )}
    </Stack>
  );
}
