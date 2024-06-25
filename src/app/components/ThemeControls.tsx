/** @format */

import React from "react";
import {
  Stack,
  Text,
  Group,
  ColorInput,
  useMantineTheme,
  Paper,
  Title,
  Tabs,
  NumberInput,
} from "@mantine/core";
import { Theme } from "../types/theme";

interface ThemeControlsProps {
  theme: Theme;
  updateTheme: (key: string, value: any) => void;
  isApplyToWebsite: boolean;
}

export default function ThemeControls({
  theme,
  updateTheme,
  isApplyToWebsite,
}: ThemeControlsProps) {
  const mantineTheme = useMantineTheme();

  const shadows = Object.entries(theme.shadows).map(([key, value]) => ({
    key,
    value: value,
  }));

  return (
    <Paper
      p="xl"
      radius="md"
      style={{
        backgroundColor: isApplyToWebsite
          ? theme.colors.background
          : mantineTheme.colors.gray[0],
        boxShadow: mantineTheme.shadows.sm,
      }}
    >
      <Tabs defaultValue="colors">
        <Tabs.List>
          <Tabs.Tab value="colors">Colors</Tabs.Tab>
          <Tabs.Tab value="fontSizes">Font Sizes</Tabs.Tab>
          <Tabs.Tab value="roundness">Roundness</Tabs.Tab>
          <Tabs.Tab value="shadows">Shadows</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="colors" pt="xs">
          <Stack p="md">
            <Title
              order={2}
              style={{
                color: isApplyToWebsite
                  ? theme.colors.text
                  : mantineTheme.colors.dark[6],
              }}
            >
              Theme Colors
            </Title>
            {Object.entries(theme.colors).map(([key, value]) => (
              <Group key={key} justify="space-between" align="center">
                <Text
                  style={{
                    color: isApplyToWebsite
                      ? theme.colors.text
                      : mantineTheme.colors.dark[6],
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {key}
                </Text>
                <ColorInput
                  value={value}
                  onChange={(color) => updateTheme(`colors.${key}`, color)}
                  format="hex"
                  swatches={[
                    "#25262b",
                    "#868e96",
                    "#fa5252",
                    "#e64980",
                    "#be4bdb",
                    "#7950f2",
                    "#4c6ef5",
                    "#228be6",
                    "#15aabf",
                    "#12b886",
                    "#40c057",
                    "#82c91e",
                    "#fab005",
                    "#fd7e14",
                  ]}
                  styles={{
                    input: { width: "120px" },
                    preview: { boxShadow: mantineTheme.shadows.sm },
                  }}
                />
              </Group>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="fontSizes" pt="xs">
          <Stack p="md">
            <Title
              order={2}
              style={{
                color: isApplyToWebsite
                  ? theme.colors.text
                  : mantineTheme.colors.dark[6],
              }}
            >
              Font Sizes
            </Title>
            {Object.entries(theme.fontSizes).map(([key, value]) => (
              <Group key={key} justify="space-between" align="center">
                <Text
                  style={{
                    color: isApplyToWebsite
                      ? theme.colors.text
                      : mantineTheme.colors.dark[6],
                    fontWeight: 500,
                  }}
                >
                  {key}
                </Text>
                <NumberInput
                  value={value}
                  onChange={(val) => updateTheme(`fontSizes.${key}`, val)}
                  min={1}
                  max={100}
                  step={1}
                  styles={{ input: { width: "120px" } }}
                />
              </Group>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="roundness" pt="xs">
          <Stack p="md">
            <Title
              order={2}
              style={{
                color: isApplyToWebsite
                  ? theme.colors.text
                  : mantineTheme.colors.dark[6],
              }}
            >
              Roundness
            </Title>
            {Object.entries(theme.roundness).map(([key, value]) => (
              <Group key={key} justify="space-between" align="center">
                <Text
                  style={{
                    color: isApplyToWebsite
                      ? theme.colors.text
                      : mantineTheme.colors.dark[6],
                    fontWeight: 500,
                  }}
                >
                  {key}
                </Text>
                <NumberInput
                  value={value}
                  onChange={(val) => updateTheme(`roundness.${key}`, val)}
                  min={0}
                  max={50}
                  step={1}
                  styles={{ input: { width: "120px" } }}
                />
              </Group>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="shadows" pt="xs">
          <Stack p="md">
            <Title
              order={2}
              style={{
                color: isApplyToWebsite
                  ? theme.colors.text
                  : mantineTheme.colors.dark[6],
              }}
            >
              Shadows
            </Title>
            {shadows.map(({ key, value }, index) => {
              if (index === 0) return null;
              //TODO: Fix in next version
              // return (
              //   <Stack key={key} p="xs">
              //     <Group justify="space-between" align="center">
              //       <Text
              //         style={{
              //           color: isApplyToWebsite
              //             ? theme.colors.text
              //             : mantineTheme.colors.dark[6],
              //           fontWeight: 500,
              //           textTransform: "capitalize",
              //         }}
              //       >
              //         {key}
              //       </Text>
              //       <ColorInput
              //         key={key}
              //         value={value}
              //         onChange={(color) => {
              //           updateTheme(`shadows.${key}.shadowColor`, color);
              //         }}
              //         format="hex"
              //         swatches={[
              //           "#25262b",
              //           "#868e96",
              //           "#fa5252",
              //           "#e64980",
              //           "#be4bdb",
              //           "#7950f2",
              //           "#4c6ef5",
              //           "#228be6",
              //           "#15aabf",
              //           "#12b886",
              //           "#40c057",
              //           "#82c91e",
              //           "#fab005",
              //           "#fd7e14",
              //         ]}
              //         styles={{
              //           input: { width: "120px" },
              //           preview: { boxShadow: mantineTheme.shadows.sm },
              //         }}
              //       />
              //     </Group>
              //   </Stack>
              // );

              return (
                <Stack key={key}>
                  <Group justify="space-between" align="center">
                    <Text
                      style={{
                        color: isApplyToWebsite
                          ? theme.colors.text
                          : mantineTheme.colors.dark[6],
                        fontWeight: 500,
                      }}
                    >
                      {key}
                    </Text>

                    <NumberInput
                      //@ts-ignore
                      value={value.elevation}
                      onChange={(val) =>
                        updateTheme(`shadows.${key}.elevation`, val)
                      }
                      min={0}
                      step={1}
                      styles={{ input: { width: "120px" } }}
                    />
                  </Group>
                </Stack>
              );
            })}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
