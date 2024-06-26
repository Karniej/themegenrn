/** @format */
"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider, useMantineTheme } from "@mantine/core";
import Home from "./page";
import { DocsPage } from "./docs";
import Header from "./components/Header";
import { ThemeProvider } from "./store/themeContext";
import { useMediaQuery } from "@mantine/hooks";

function App() {
  return (
    <MantineProvider>
      <ThemeProvider>
        <Router>
          <Header />
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
