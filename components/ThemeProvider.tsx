"use client";

import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.vwTheme = "light";
    document.documentElement.style.colorScheme = "light";
    localStorage.setItem("vinhworks-theme", "light");
  }, []);

  return <>{children}</>;
}
