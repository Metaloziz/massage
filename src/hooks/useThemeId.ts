"use client";

import { useEffect, useState } from "react";
import {
  readDocumentBackdropId,
  readDocumentThemeId,
} from "@/design/applyTheme";
import {
  BACKDROP_CHANGE_EVENT,
  defaultBackdropId,
  defaultThemeId,
  isBackdropId,
  isThemeId,
  THEME_CHANGE_EVENT,
  type BackdropId,
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

export function useBackdropId(): BackdropId {
  const [backdropId, setBackdropId] = useState<BackdropId>(defaultBackdropId);

  useEffect(() => {
    setBackdropId(readDocumentBackdropId());

    const onBackdropChange = (event: Event) => {
      const detail = (event as CustomEvent<{ backdropId?: string }>).detail;
      if (isBackdropId(detail?.backdropId)) {
        setBackdropId(detail.backdropId);
        return;
      }
      setBackdropId(readDocumentBackdropId());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme-backdrop") return;
      setBackdropId(readDocumentBackdropId());
    };

    window.addEventListener(BACKDROP_CHANGE_EVENT, onBackdropChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(BACKDROP_CHANGE_EVENT, onBackdropChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return backdropId;
}

/** Soft Earth (бывший design3). */
export function useIsDesign2(): boolean {
  return useThemeId() === "design2";
}

export function useThemeFlags() {
  const themeId = useThemeId();
  return {
    themeId,
    isDesign1: themeId === "design1",
    isDesign2: themeId === "design2",
  };
}
