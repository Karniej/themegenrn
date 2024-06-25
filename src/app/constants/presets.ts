/** @format */

import { Theme } from "../types/theme";

const defaultFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

const defaultRoundness = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
};

const defaultShadows = {
  shadowColor: "#000",
  xs: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  sm: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  lg: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  xxl: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
};

export const presets: Record<string, { light: Theme; dark: Theme }> = {
  Default: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(0, 122, 255)",
        background: "rgb(242, 242, 242)",
        card: "rgb(255, 255, 255)",
        text: "rgb(28, 28, 30)",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
        secondary: "rgb(142, 142, 147)",
        accent: "rgb(255, 149, 0)",
        success: "rgb(52, 199, 89)",
        error: "rgb(255, 59, 48)",
      },
      fontSizes: defaultFontSizes,
      roundness: defaultRoundness,
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(10, 132, 255)",
        background: "rgb(1, 1, 1)",
        card: "rgb(18, 18, 18)",
        text: "rgb(229, 229, 231)",
        border: "rgb(39, 39, 41)",
        notification: "rgb(255, 69, 58)",
        secondary: "rgb(142, 142, 147)",
        accent: "rgb(255, 159, 10)",
        success: "rgb(48, 209, 88)",
        error: "rgb(255, 69, 58)",
      },
      fontSizes: defaultFontSizes,
      roundness: defaultRoundness,
      shadows: defaultShadows,
    },
  },
  Ocean: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(0, 99, 155)",
        background: "rgb(240, 248, 255)",
        card: "rgb(255, 255, 255)",
        text: "rgb(20, 30, 40)",
        border: "rgb(200, 220, 240)",
        notification: "rgb(255, 100, 100)",
        secondary: "rgb(100, 150, 200)",
        accent: "rgb(255, 170, 0)",
        success: "rgb(0, 180, 130)",
        error: "rgb(255, 100, 100)",
      },
      fontSizes: defaultFontSizes,
      roundness: { ...defaultRoundness, md: 10, lg: 15 },
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(0, 149, 205)",
        background: "rgb(0, 20, 40)",
        card: "rgb(10, 30, 50)",
        text: "rgb(220, 230, 240)",
        border: "rgb(40, 60, 80)",
        notification: "rgb(255, 120, 120)",
        secondary: "rgb(120, 170, 220)",
        accent: "rgb(255, 190, 20)",
        success: "rgb(20, 200, 150)",
        error: "rgb(255, 120, 120)",
      },
      fontSizes: defaultFontSizes,
      roundness: { ...defaultRoundness, md: 10, lg: 15 },
      shadows: defaultShadows,
    },
  },
  Forest: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(34, 139, 34)",
        background: "rgb(245, 250, 245)",
        card: "rgb(255, 255, 255)",
        text: "rgb(30, 50, 30)",
        border: "rgb(200, 230, 200)",
        notification: "rgb(255, 140, 0)",
        secondary: "rgb(100, 180, 100)",
        accent: "rgb(255, 190, 0)",
        success: "rgb(0, 180, 80)",
        error: "rgb(220, 80, 60)",
      },
      fontSizes: { ...defaultFontSizes, md: 18, lg: 20 },
      roundness: { ...defaultRoundness, sm: 6, md: 12 },
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(50, 205, 50)",
        background: "rgb(10, 30, 10)",
        card: "rgb(20, 40, 20)",
        text: "rgb(220, 240, 220)",
        border: "rgb(40, 80, 40)",
        notification: "rgb(255, 165, 0)",
        secondary: "rgb(120, 200, 120)",
        accent: "rgb(255, 210, 20)",
        success: "rgb(20, 200, 100)",
        error: "rgb(240, 100, 80)",
      },
      fontSizes: { ...defaultFontSizes, md: 18, lg: 20 },
      roundness: { ...defaultRoundness, sm: 6, md: 12 },
      shadows: defaultShadows,
    },
  },
  Lavender: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(123, 104, 238)",
        background: "rgb(250, 245, 255)",
        card: "rgb(255, 255, 255)",
        text: "rgb(50, 40, 60)",
        border: "rgb(230, 220, 240)",
        notification: "rgb(255, 105, 180)",
        secondary: "rgb(180, 160, 240)",
        accent: "rgb(255, 200, 100)",
        success: "rgb(100, 220, 100)",
        error: "rgb(255, 105, 180)",
      },
      fontSizes: { ...defaultFontSizes, sm: 15, md: 17 },
      roundness: { ...defaultRoundness, xs: 4, sm: 8 },
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(138, 119, 253)",
        background: "rgb(30, 20, 40)",
        card: "rgb(40, 30, 50)",
        text: "rgb(230, 220, 240)",
        border: "rgb(70, 60, 80)",
        notification: "rgb(255, 120, 195)",
        secondary: "rgb(200, 180, 255)",
        accent: "rgb(255, 220, 120)",
        success: "rgb(120, 240, 120)",
        error: "rgb(255, 120, 195)",
      },
      fontSizes: { ...defaultFontSizes, sm: 15, md: 17 },
      roundness: { ...defaultRoundness, xs: 4, sm: 8 },
      shadows: defaultShadows,
    },
  },
  Sunset: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(255, 99, 71)",
        background: "rgb(255, 250, 240)",
        card: "rgb(255, 255, 255)",
        text: "rgb(60, 40, 30)",
        border: "rgb(240, 220, 200)",
        notification: "rgb(255, 165, 0)",
        secondary: "rgb(255, 160, 130)",
        accent: "rgb(255, 200, 50)",
        success: "rgb(100, 200, 100)",
        error: "rgb(255, 90, 90)",
      },
      fontSizes: { ...defaultFontSizes, lg: 20, xl: 24 },
      roundness: { ...defaultRoundness, lg: 16, xl: 24 },
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(255, 114, 86)",
        background: "rgb(40, 20, 10)",
        card: "rgb(50, 30, 20)",
        text: "rgb(240, 220, 200)",
        border: "rgb(80, 60, 40)",
        notification: "rgb(255, 180, 0)",
        secondary: "rgb(255, 180, 150)",
        accent: "rgb(255, 220, 70)",
        success: "rgb(120, 220, 120)",
        error: "rgb(255, 110, 110)",
      },
      fontSizes: { ...defaultFontSizes, lg: 20, xl: 24 },
      roundness: { ...defaultRoundness, lg: 16, xl: 24 },
      shadows: defaultShadows,
    },
  },
  Gruvbox: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(204, 36, 29)", // red
        background: "rgb(249, 245, 215)", // light0_hard
        card: "rgb(242, 229, 188)", // light1
        text: "rgb(60, 56, 54)", // dark1
        border: "rgb(189, 174, 147)", // light4
        notification: "rgb(254, 128, 25)", // orange
        secondary: "rgb(152, 151, 26)", // green
        accent: "rgb(215, 153, 33)", // yellow
        success: "rgb(152, 151, 26)", // green
        error: "rgb(204, 36, 29)", // red
      },
      fontSizes: { ...defaultFontSizes, md: 17, lg: 19 },
      roundness: { ...defaultRoundness, sm: 3, md: 5 },
      shadows: defaultShadows,
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(251, 73, 52)", // red
        background: "rgb(29, 32, 33)", // dark0_hard
        card: "rgb(50, 48, 47)", // dark1
        text: "rgb(213, 196, 161)", // light2
        border: "rgb(124, 111, 100)", // dark4
        notification: "rgb(254, 128, 25)", // orange
        secondary: "rgb(184, 187, 38)", // green
        accent: "rgb(250, 189, 47)", // yellow
        success: "rgb(184, 187, 38)", // green
        error: "rgb(251, 73, 52)", // red
      },
      fontSizes: { ...defaultFontSizes, md: 17, lg: 19 },
      roundness: { ...defaultRoundness, sm: 3, md: 5 },
      shadows: defaultShadows,
    },
  },
};
