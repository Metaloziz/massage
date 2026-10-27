/**
 * Документ дизайна сайта.
 *
 * Как добавить новый вид:
 * 1. Скопируй блок темы в `themes`.
 * 2. Задай новый `id`, `label` и токены.
 * 3. Тема сразу появится в выпадающем списке в шапке.
 *
 * Default: `design1`. Неизвестный localStorage → design1.
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
  glass: string;
  line: string;
  glow: string;
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
export const THEME_CHANGE_EVENT = "massage:theme-change";

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
      glass: "rgba(255, 252, 248, 0.72)",
      line: "rgba(42, 36, 32, 0.14)",
      glow: "rgba(125, 143, 122, 0.25)",
    },
  },
  design2: {
    id: "design2",
    label: "Дизайн 2",
    note: "Nature glass: leaves.png, glass panels, silk teal-moss buttons, IBM Plex Mono.",
    colorScheme: "dark",
    tokens: {
      background: "#0c1210",
      foreground: "#f2f5f3",
      muted: "rgba(232, 236, 233, 0.68)",
      accent: "#8faf8a",
      accentLight: "rgba(143, 175, 138, 0.16)",
      border: "rgba(255, 255, 255, 0.14)",
      card: "rgba(16, 24, 20, 0.55)",
      heroSurface: "#0a100e",
      heroOverlay: "rgba(8, 14, 12, 0.42)",
      heroText: "#f5f7f4",
      heroMuted: "rgba(232, 236, 233, 0.78)",
      heroCtaFg: "#0e1612",
      radiusCard: "1.25rem",
      radiusControl: "9999px",
      glass: "rgba(12, 20, 16, 0.48)",
      line: "rgba(255, 255, 255, 0.16)",
      glow: "rgba(143, 175, 138, 0.22)",
    },
  },
  design3: {
    id: "design3",
    label: "Дизайн 3",
    note: "Soft earth: dense leaves bg, Manrope, matte soft panels, sand buttons. Light type on bg, dark type in panels.",
    colorScheme: "dark",
    tokens: {
      background: "#1e3a2f",
      foreground: "#f3f0e6",
      muted: "rgba(243, 240, 230, 0.72)",
      accent: "#c5d9b0",
      accentLight: "rgba(197, 217, 176, 0.18)",
      border: "rgba(243, 240, 230, 0.2)",
      card: "#ebe4d2",
      heroSurface: "#1a2e26",
      heroOverlay: "rgba(12, 28, 22, 0.35)",
      heroText: "#1f281c",
      heroMuted: "rgba(31, 40, 28, 0.72)",
      heroCtaFg: "#2a241c",
      radiusCard: "1.6rem",
      radiusControl: "9999px",
      glass: "rgba(235, 228, 210, 0.92)",
      line: "rgba(42, 50, 40, 0.12)",
      glow: "rgba(197, 217, 176, 0.25)",
    },
  },
} as const satisfies Record<string, ThemeDefinition>;

export type ThemeId = keyof typeof themes;

export const defaultThemeId: ThemeId = "design1";

export const themeList: ThemeDefinition[] = Object.values(themes);

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return Boolean(value && value in themes);
}

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
    "--glass": tokens.glass,
    "--line": tokens.line,
    "--glow": tokens.glow,
  };
}
