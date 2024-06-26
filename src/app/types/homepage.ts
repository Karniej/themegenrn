/** @format */

import { PageConfig, NextPage } from "next";
import { Theme } from "./theme";

export interface HomeProps {
  themeName: string;
  setThemeName: (themeName: string) => void;
  currentThemes: { light: Theme; dark: Theme };
  addToHistory: (lightTheme: Theme, darkTheme: Theme) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  handleCompare: () => void;
  handleGeneratePalette: () => void;
  shareTheme: (theme: Theme) => void;
  shareURL: string;
  applyToWebsite: boolean;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  accessibilityWarnings: string[];
  updateTheme: (key: string, value: any) => void;
  theme: Theme;
  setCurrentTheme: (theme: "light" | "dark") => void;
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
  currPresetName: string | null;
  handlePresetChange: (value: string) => void;
  setApplyToWebsite: (applyToWebsite: boolean) => void;
}
