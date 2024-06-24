/** @format */
"use_client";

import React, { useState, useRef } from "react";
import { Stack, TextInput, Button, Group } from "@mantine/core";
import { Theme } from "../utils/presets";

interface DownloadSectionProps {
  themeName: string;
  setThemeName: (name: string) => void;
  lightTheme: Theme;
  darkTheme: Theme;
  setLightTheme: (theme: Theme) => void;
  setDarkTheme: (theme: Theme) => void;
}

export default function DownloadSection({
  themeName,
  setThemeName,
  lightTheme,
  darkTheme,
  setLightTheme,
  setDarkTheme,
}: DownloadSectionProps) {
  const [email, setEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <Stack>
      <TextInput
        label="Theme Name"
        value={themeName}
        onChange={(e) => setThemeName(e.currentTarget.value)}
      />
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Group>
        <Button onClick={handleExport}>Export Theme</Button>
        <Button onClick={() => fileInputRef.current?.click()}>
          Import Theme
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
          accept=".json"
        />
      </Group>
    </Stack>
  );
}
