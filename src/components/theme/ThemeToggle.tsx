"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyAppearance,
  applyTheme,
  getStoredAppearanceId,
  getStoredThemeId,
} from "@/design/applyTheme";
import {
  APPEARANCE_CHANGE_EVENT,
  type AppearanceId,
} from "@/design/themes";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [appearance, setAppearance] = useState<AppearanceId>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    applyTheme(getStoredThemeId());
    const current = getStoredAppearanceId();
    applyAppearance(current);
    setAppearance(current);
    setReady(true);

    const onAppearance = (event: Event) => {
      const detail = (event as CustomEvent<{ appearanceId?: string }>).detail;
      if (detail?.appearanceId === "light" || detail?.appearanceId === "dark") {
        setAppearance(detail.appearanceId);
      }
    };

    window.addEventListener(APPEARANCE_CHANGE_EVENT, onAppearance);
    return () => window.removeEventListener(APPEARANCE_CHANGE_EVENT, onAppearance);
  }, []);

  const toggle = () => {
    const next: AppearanceId = appearance === "dark" ? "light" : "dark";
    applyAppearance(next);
    setAppearance(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--line)] bg-transparent text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-60 ${className}`}
      aria-label={
        appearance === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
      }
      suppressHydrationWarning
    >
      {ready && appearance === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
