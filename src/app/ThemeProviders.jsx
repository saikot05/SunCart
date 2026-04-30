"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}