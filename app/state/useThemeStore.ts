import { create } from "zustand";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme as "light" | "dark";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

// Set the initial theme class on the HTML element
// This script runs before the components hydrate, preventing a flicker
if (typeof window !== "undefined") {
  const initialTheme = getInitialTheme();
  document.documentElement.classList.toggle("dark", initialTheme === "dark");
}

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      // Update the class on the HTML element
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    });
  },
}));
