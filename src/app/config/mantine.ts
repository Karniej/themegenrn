/** @format */

import { keyframes } from "@emotion/react";

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const slideInFromRight = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

export const pulseAnimation = keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.05)" },
  "100%": { transform: "scale(1)" },
});
