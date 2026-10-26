"use client";

import { useEffect, useState } from "react";
import { readDocumentThemeId } from "@/design/applyTheme";
import {
  defaultThemeId,
  isThemeId,
  THEME_CHANGE_EVENT,
  type ThemeId,
} from "@/design/themes";

export function useThemeId(): ThemeId {
  const [themeId, setThemeId] = useState<ThemeId>(defaultThemeId);

  useEffect(() => {
    setThemeId(readDocumentThemeId());

    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ themeId?: string }>).detail;
      if (isThemeId(detail?.themeId)) {
        setThemeId(detail.themeId);
        return;
      }
      setThemeId(readDocumentThemeId());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      setThemeId(readDocumentThemeId());
    };

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return themeId;
}

export function useIsDesign2(): boolean {
  return useThemeId() === "design2";
}
