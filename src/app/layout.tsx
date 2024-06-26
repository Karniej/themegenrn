/** @format */
"use client";
import "@mantine/core/styles.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Poppins } from "next/font/google";
import App from "./app";
import { ThemeProvider } from "./store/themeContext";
import Header from "./components/Header";
import { GlobalStyles } from "./components/GlobalStyles";
import { metadata } from "./config/meteadata";
import { Analytics } from "./components/Analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <head>
          <link rel="icon" href="/logo.png" type="image/png" />
        </head>
        <Analytics />
      </head>
      <body className={poppins.className}>
        <MantineProvider>
          <ThemeProvider>
            <Header />
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
