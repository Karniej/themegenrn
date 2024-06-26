/** @format */

import { colord } from "colord";
import { Theme } from "../types/theme";

export function encodeThemeToURL(theme: { light: Theme; dark: Theme }) {
  const encodedTheme = encodeURIComponent(JSON.stringify(theme));
  return `${window.location.origin}${window.location.pathname}?theme=${encodedTheme}`;
}

export function decodeThemeFromURL(): { light: Theme; dark: Theme } | null {
  const params = new URLSearchParams(window.location.search);
  const encodedTheme = params.get("theme");
  if (encodedTheme) {
    try {
      return JSON.parse(decodeURIComponent(encodedTheme));
    } catch (error) {
      console.error("Error parsing theme from URL:", error);
    }
  }
  return null;
}

export function generateDarkTheme(lightTheme: Theme): Theme {
  //@ts-ignore
  const darkTheme: Theme = {
    dark: true,
    colors: {} as Theme["colors"],
  };

  for (const [key, value] of Object.entries(lightTheme.colors)) {
    const color = colord(value);
    switch (key) {
      case "background":
        darkTheme.colors[key] = color.darken(0.8).toRgbString();
        break;
      case "text":
        darkTheme.colors[key] = color.lighten(0.8).toRgbString();
        break;
      case "card":
        darkTheme.colors[key] = color.darken(0.7).toRgbString();
        break;
      case "border":
        darkTheme.colors[key] = color.darken(0.5).toRgbString();
        break;
    }
  }

  return darkTheme;
}

function getContrastColor(color: string, light: string, dark: string): string {
  return colord(color).contrast(colord(light)) >
    colord(color).contrast(colord(dark))
    ? light
    : dark;
}

function generateAccessibleColor(targetColor: string, bgColor: string): string {
  let color = colord(targetColor);
  let attempts = 0;
  const maxAttempts = 20;

  while (color.contrast(bgColor) < 4.5 && attempts < maxAttempts) {
    color = color.darken(0.05);
    attempts++;
  }

  return color.toRgbString();
}

export function generatePalette(baseColor: string) {
  try {
    const base = colord(baseColor);
    const lightBackground = base.lighten(0.4).desaturate(0.2).toRgbString();
    const darkBackground = base.darken(0.4).desaturate(0.2).toRgbString();

    const lightTheme: Theme = {
      dark: false,
      colors: {
        primary: base.toRgbString(),
        background: lightBackground,
        card: base.lighten(0.5).desaturate(0.1).toRgbString(),
        text: getContrastColor(lightBackground, "#000000", "#FFFFFF"),
        border: base.lighten(0.2).desaturate(0.1).toRgbString(),
        notification: base.rotate(180).saturate(0.2).toRgbString(),
        secondary: base.rotate(120).saturate(0.1).toRgbString(),
        accent: base.rotate(240).saturate(0.2).toRgbString(),
        success: generateAccessibleColor("#00C853", lightBackground),
        error: generateAccessibleColor("#D50000", lightBackground),
      },
      fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
      },
      roundness: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
      },
      shadows: {
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
      },
    };

    const darkTheme: Theme = {
      ...lightTheme,
      dark: true,
      colors: {
        ...lightTheme.colors,
        primary: base.lighten(0.1).saturate(0.1).toRgbString(),
        background: darkBackground,
        card: base.darken(0.3).desaturate(0.1).toRgbString(),
        text: getContrastColor(darkBackground, "#FFFFFF", "#000000"),
        border: base.darken(0.2).desaturate(0.1).toRgbString(),
        success: generateAccessibleColor("#00E676", darkBackground),
        error: generateAccessibleColor("#FF1744", darkBackground),
      },
    };

    return { light: lightTheme, dark: darkTheme };
  } catch (error) {
    console.error("Error generating palette:", error);
    throw error;
  }
}
