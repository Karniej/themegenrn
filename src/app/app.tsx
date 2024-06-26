/** @format */
"use client";
import { MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import { ThemeProvider } from "./store/themeContext";
import { AppProps } from "next/app";
import { GlobalStyles } from "./components/GlobalStyles";

export function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <ThemeProvider>
        <Header />
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;
