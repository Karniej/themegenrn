/** @format */

import React, { useState } from "react";
import { Box, Tooltip, ActionIcon } from "@mantine/core";
//@ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dark,
  gruvboxDark,
  //@ts-ignore
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconCopy } from "@tabler/icons-react";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copyIndicator, setCopyIndicator] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyIndicator(true);
      setTimeout(() => setCopyIndicator(false), 2000); // Hide after 2 seconds
    });
  };

  return (
    <Box mb="md" style={{ position: "relative" }}>
      <SyntaxHighlighter language={language} style={gruvboxDark}>
        {code}
      </SyntaxHighlighter>
      <Tooltip label="Copied!" opened={copyIndicator} position="top" withArrow>
        <ActionIcon
          size="sm"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleCopy}
        >
          <IconCopy size={16} />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};

export default CodeBlock;
