/** @format */

import { colord, extend, Colord } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

function rotateHue(color: Colord, degrees: number): string {
  const hsl = color.toHsl();
  return colord({
    h: (hsl.h + degrees) % 360,
    s: hsl.s,
    l: hsl.l,
  }).toRgbString();
}

export function generateHarmonies(color: string) {
  const baseColor = colord(color);
  return {
    analogous: rotateHue(baseColor, 30),
    complement: rotateHue(baseColor, 180),
    triadic: rotateHue(baseColor, 120),
  };
}

extend([a11yPlugin, harmoniesPlugin]);
