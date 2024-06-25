/** @format */

import "@mantine/core/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Themegen.xyz",
  description: "Theme generator for Tamagui and React Native StyleSheet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <head>
          <link rel="icon" href="/logo.png" type="image/png" />
        </head>
      </head>
      <body className={poppins.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
