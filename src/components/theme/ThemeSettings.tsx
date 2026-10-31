"use client";

/**
 * Законсервировано: UI скрыт (`themeSelectionLocked`).
 * Чтобы вернуть переключатель — покажи компонент в Header и сними лок в themes.ts.
 */

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Settings, X } from "lucide-react";
import {
  applyBackdrop,
  applyTheme,
  getStoredBackdropId,
  getStoredThemeId,
} from "@/design/applyTheme";
import {
  design2Backdrops,
  isBackdropId,
  isThemeId,
  themeList,
  themes,
  type BackdropId,
  type ThemeId,
} from "@/design/themes";
import { assetPath } from "@/lib/assetPath";
import { lockBodyScroll } from "@/lib/scrollLock";

export function ThemeSettings({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState<ThemeId>("design1");
  const [backdropId, setBackdropId] = useState<BackdropId>("leaves-dense");
  const [ready, setReady] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const currentTheme = getStoredThemeId();
    applyTheme(currentTheme);
    setThemeId(currentTheme);
    setBackdropId(getStoredBackdropId());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const unlock = lockBodyScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectTheme = (value: string) => {
    if (!isThemeId(value)) return;
    applyTheme(value);
    setThemeId(value);
    if (themes[value].hasBackdropOptions) {
      setBackdropId(getStoredBackdropId());
    }
  };

  const selectBackdrop = (value: string) => {
    if (!isBackdropId(value)) return;
    applyBackdrop(value);
    setBackdropId(value);
  };

  const showBackdrops = Boolean(themes[themeId]?.hasBackdropOptions);
  const isSoft = themeId === "design2";

  return (
    <>
      <button
        type="button"
        disabled={!ready}
        onClick={() => setOpen(true)}
        className={`inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--line)] bg-transparent px-3.5 text-sm font-medium tracking-[0.02em] text-foreground transition-colors hover:border-accent disabled:opacity-60 ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Настройки дизайна"
      >
        <Settings size={16} aria-hidden />
        <span className="hidden sm:inline">Дизайн</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-6"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            className={`max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl border p-6 shadow-2xl sm:rounded-3xl sm:p-8 ${
              isSoft
                ? "border-[rgba(42,50,40,0.12)] bg-[#ebe4d2] text-[#2a3228]"
                : "border-border bg-background text-foreground"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="font-serif text-2xl font-medium md:text-3xl"
                >
                  Настройки
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Дизайн сайта и фон
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-muted transition-colors hover:text-foreground"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
            </div>

            <fieldset className="space-y-3">
              <legend className="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
                Дизайн
              </legend>
              <div className="grid gap-3">
                {themeList.map((theme) => {
                  const active = theme.id === themeId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => selectTheme(theme.id)}
                      className={`rounded-[var(--radius-card)] border px-4 py-3.5 text-left transition-all ${
                        active
                          ? "border-accent bg-accent/10 shadow-[var(--shadow-control,0_2px_8px_rgba(0,0,0,0.08))]"
                          : "border-[var(--line)] hover:border-accent/50"
                      }`}
                      aria-pressed={active}
                    >
                      <span className="block font-medium">{theme.label}</span>
                      {theme.note && (
                        <span className="mt-1 block text-sm text-muted">
                          {theme.note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {showBackdrops && (
              <fieldset className="mt-8 space-y-3">
                <legend className="mb-3 text-xs font-medium tracking-widest text-accent uppercase">
                  Фон
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  {design2Backdrops.map((item) => {
                    const active = item.id === backdropId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectBackdrop(item.id)}
                        className={`group overflow-hidden rounded-[var(--radius-control)] border text-left transition-all ${
                          active
                            ? "border-accent ring-2 ring-accent/30"
                            : "border-[var(--line)] hover:border-accent/50"
                        }`}
                        aria-pressed={active}
                        aria-label={item.label}
                      >
                        <span className="relative block aspect-square w-full">
                          {item.kind === "image" ? (
                            <Image
                              src={assetPath(item.value)}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="120px"
                            />
                          ) : (
                            <span
                              className="absolute inset-0"
                              style={{ background: item.value }}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </div>
        </div>
      )}
    </>
  );
}
