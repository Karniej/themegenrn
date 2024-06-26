/** @format */

import { Global } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={() => ({
        "*": {
          transition:
            "background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out, border-color 0.2s ease-in-out, padding 0.2s ease-in-out, margin 0.2s ease-in-out",
        },
      })}
    />
  );
}
