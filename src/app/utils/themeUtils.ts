/** @format */

import { Theme } from "./presets";
import { colord } from "colord";

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
      default:
        darkTheme.colors[key] = color.saturate(0.1).toRgbString();
    }
  }

  return darkTheme;
}

function getContrastColor(
  color: string,
  darkColor: string,
  lightColor: string,
): string {
  return colord(color).contrast(colord(darkColor)) >= 4.5
    ? darkColor
    : lightColor;
}

export function generatePalette(primaryColor: string): {
  light: Theme;
  dark: Theme;
} {
  const base = colord(primaryColor);

  const lightTheme: Theme = {
    dark: false,
    colors: {
      primary: base.toRgbString(),
      background: base.lighten(0.4).desaturate(0.2).toRgbString(),
      card: "#FFFFFF",
      text: getContrastColor(
        base.lighten(0.4).desaturate(0.2).toRgbString(),
        "#000000",
        "#FFFFFF",
      ),
      border: base.lighten(0.2).desaturate(0.1).toRgbString(),
      notification: base.rotate(180).saturate(0.2).toRgbString(),
    },
  };

  const darkTheme: Theme = {
    dark: true,
    colors: {
      primary: base.lighten(0.1).saturate(0.1).toRgbString(),
      background: base.darken(0.8).desaturate(0.2).toRgbString(),
      card: base.darken(0.6).desaturate(0.1).toRgbString(),
      text: getContrastColor(
        base.darken(0.8).desaturate(0.2).toRgbString(),
        "#FFFFFF",
        "#000000",
      ),
      border: base.darken(0.4).desaturate(0.1).toRgbString(),
      notification: base.rotate(180).lighten(0.2).saturate(0.2).toRgbString(),
    },
  };

  return { light: lightTheme, dark: darkTheme };
}
