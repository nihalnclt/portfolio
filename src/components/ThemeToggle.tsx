"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@/components/icons";

export default function ThemeToggle() {
  // null until mounted so the server render carries no theme assumption
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed right-4 top-4 z-50 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/70 text-faint backdrop-blur transition-colors hover:border-line-strong hover:text-heading"
    >
      {isDark !== null && (isDark ? <Sun /> : <Moon />)}
    </button>
  );
}
