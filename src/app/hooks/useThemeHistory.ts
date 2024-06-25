/** @format */
"use_client";

import { useState } from "react";
import { Theme } from "../types/theme";

interface HistoryEntry {
  presetName: string;
  light: Theme;
  dark: Theme;
}

export function useThemeHistory(initialLight: Theme, initialDark: Theme) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { presetName: "Default", light: initialLight, dark: initialDark },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const addToHistory = (light: Theme, dark: Theme) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push({ presetName: "Default", light, dark });
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (canUndo) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (canRedo) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return {
    currentThemes: history[currentIndex],
    currentPresetName: history[currentIndex].presetName,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
