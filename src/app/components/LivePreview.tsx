/** @format */

import { useMemo } from "react";
import { Box, Text } from "@mantine/core";
import { Theme } from "../types/theme";
import { generateSnackUrl } from "../utils/generateSnackCode";

interface LivePreviewProps {
  theme: Theme;
}

export default function LivePreview({ theme }: LivePreviewProps) {
  const snackUrl = useMemo(() => generateSnackUrl(theme), [theme]);

  return (
    <Box style={{ position: "relative", width: "65%", margin: "auto" }}>
      <Text size="xl" fw={700} mb="md">
        Live Preview
      </Text>
      <Box style={{ position: "relative" }}>
        <iframe
          src={snackUrl}
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflow: "hidden",
          }}
          frameBorder="0"
        />
      </Box>
    </Box>
  );
}
