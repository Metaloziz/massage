/**
 * Документ дизайна сайта.
 *
 * Как добавить новый вид:
 * 1. Скопируй блок `design1` в `themes`.
 * 2. Задай новый `id`, `label` и токены.
 * 3. Тема сразу появится в выпадающем списке в шапке.
 *
 * Старые значения localStorage (`light` / `dark` / `warm` / `current` / …)
 * пока сводятся к `design1`.
 */

export type ColorScheme = "light" | "dark";

/** Визуальные токены одной темы — единый источник правды для CSS. */
export type DesignTokens = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  accentLight: string;
  border: string;
  card: string;
  heroSurface: string;
  heroOverlay: string;
  heroText: string;
  heroMuted: string;
  heroCtaFg: string;
  radiusCard: string;
  radiusControl: string;
};

export type ThemeDefinition = {
  id: string;
  label: string;
  /** Короткое описание для себя / референсов */
  note?: string;
  colorScheme: ColorScheme;
  tokens: DesignTokens;
};

export const THEME_STORAGE_KEY = "theme";

export const themes = {
  design1: {
    id: "design1",
    label: "Дизайн 1",
    note: "Первый сохранённый дизайн: тёплый беж + шалфей, hero фото справа на десктопе, кнопки rounded-xl.",
    colorScheme: "light",
    tokens: {
      background: "#f7f3ee",
      foreground: "#2a2420",
      muted: "#6e6560",
      accent: "#7d8f7a",
      accentLight: "#e4ebe3",
      border: "#e4ddd4",
      card: "#fffcf8",
      heroSurface: "#1f1b18",
      heroOverlay: "rgba(32, 28, 24, 0.38)",
      heroText: "#fffcf8",
      heroMuted: "rgba(255, 252, 248, 0.82)",
      heroCtaFg: "#2a2420",
      radiusCard: "1.5rem",
      radiusControl: "0.75rem",
    },
  },
} as const satisfies Record<string, ThemeDefinition>;

export type ThemeId = keyof typeof themes;

export const defaultThemeId: ThemeId = "design1";

export const themeList: ThemeDefinition[] = Object.values(themes);

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return Boolean(value && value in themes);
}

/** Любые старые id тем ведут на Дизайн 1. */
export function resolveThemeId(stored: string | null): ThemeId {
  if (isThemeId(stored)) return stored;
  return defaultThemeId;
}

export function tokensToCssVars(
  tokens: DesignTokens,
): Record<`--${string}`, string> {
  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--muted": tokens.muted,
    "--accent": tokens.accent,
    "--accent-light": tokens.accentLight,
    "--border": tokens.border,
    "--card": tokens.card,
    "--hero-surface": tokens.heroSurface,
    "--hero-overlay": tokens.heroOverlay,
    "--hero-text": tokens.heroText,
    "--hero-muted": tokens.heroMuted,
    "--hero-cta-fg": tokens.heroCtaFg,
    "--radius-card": tokens.radiusCard,
    "--radius-control": tokens.radiusControl,
  };
}
