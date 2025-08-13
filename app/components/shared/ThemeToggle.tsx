"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/app/state/useThemeStore";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  // Set the mounted state to true once the component has rendered on the client.
  // This prevents hydration errors by not rendering the button on the server.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null on the server to avoid hydration errors.
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full cursor-pointer transition-colors duration-300 ease-in-out bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600 text-gray-800 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
