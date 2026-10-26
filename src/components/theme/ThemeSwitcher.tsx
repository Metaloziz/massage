"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  applyTheme,
  getStoredThemeId,
} from "@/design/applyTheme";
import {
  defaultThemeId,
  isThemeId,
  themeList,
  type ThemeId,
} from "@/design/themes";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const [themeId, setThemeId] = useState<ThemeId>(defaultThemeId);
  const [ready, setReady] = useState(false);
  const selectId = useId();

  useEffect(() => {
    const current = getStoredThemeId();
    applyTheme(current);
    setThemeId(current);
    setReady(true);
  }, []);

  const onChange = (value: string) => {
    if (!isThemeId(value)) return;
    applyTheme(value);
    setThemeId(value);
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={selectId} className="sr-only">
        Дизайн сайта
      </label>
      <select
        id={selectId}
        value={themeId}
        disabled={!ready}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 appearance-none rounded-[var(--radius-control)] border border-[var(--line)] bg-transparent py-2 pr-10 pl-4 text-sm font-medium tracking-[0.02em] text-foreground outline-none transition-colors hover:border-accent disabled:opacity-60"
        aria-label="Выбор дизайна"
        suppressHydrationWarning
      >
        {themeList.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-current opacity-70"
        aria-hidden
      />
    </div>
  );
}
