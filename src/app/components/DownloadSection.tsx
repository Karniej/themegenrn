/** @format */
"use_client";

import React, { useState, useRef, useCallback } from "react";
import { Stack, TextInput, Button, Group, Tooltip } from "@mantine/core";
import {
  IconCopy,
  IconDownload,
  IconShare,
  IconUpload,
} from "@tabler/icons-react";
import { useThemeContext } from "../store/themeContext";
import { ShareModal } from "./ShareModal";

export default function DownloadSection({}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    theme,
    setThemeName,
    themeName,
    currentThemes,
    shareURL,
    shareTheme,
    addToHistory,
  } = useThemeContext();
  const lightTheme = currentThemes.light;
  const darkTheme = currentThemes.dark;
  const [copyIndicator, setCopyIndicator] = useState(false);
  const [exportCount, setExportCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleExport = useCallback(() => {
    setExportCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 3 === 0) {
        setShowShareModal(true);
      }
      return newCount;
    });
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
  }, [themeName, lightTheme, darkTheme]);

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
          addToHistory(importedThemes[themeName].light, currentThemes.dark);
          addToHistory(importedThemes[themeName].dark, currentThemes.light);
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
      setTimeout(() => setCopyIndicator(false), 2000);
    });
  };

  return (
    <Stack>
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
          onClick={(e) => {
            shareTheme(theme);
          }}
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
      <ShareModal
        opened={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </Stack>
  );
}
