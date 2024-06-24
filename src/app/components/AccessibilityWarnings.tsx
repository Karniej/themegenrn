/** @format */

import React from "react";
import { Alert } from "@mantine/core";

interface AccessibilityWarningsProps {
  warnings: string[];
}

export default function AccessibilityWarnings({
  warnings,
}: AccessibilityWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <Alert color="yellow" title="Accessibility Warnings">
      <ul>
        {warnings.map((warning, index) => (
          <li key={index}>{warning}</li>
        ))}
      </ul>
    </Alert>
  );
}
