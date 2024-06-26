/** @format */
"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Home from "./page";
import { DocsPage } from "./docs";
import Header from "./components/Header";
import { ThemeProvider } from "./store/themeContext";
import { Global } from "@emotion/react";

function GlobalStyles() {
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

function App() {
  return (
    <MantineProvider>
      <ThemeProvider>
        <Router>
          <Header />
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;
