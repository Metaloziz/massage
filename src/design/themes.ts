/**
 * Документ дизайна сайта.
 *
 * Прод: зафиксирован Дизайн 1 (`design1`). Soft Earth (`design2`) законсервирован.
 * Светлая / тёмная палитра Дизайна 1 — через солнышко (`ThemeToggle`, `appearance`).
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
  /** Есть ли выбор заднего фона в настройках */
  hasBackdropOptions?: boolean;
  tokens: DesignTokens;
};

export type BackdropKind = "image" | "color";

export type BackdropOption = {
  id: string;
  label: string;
  kind: BackdropKind;
  /** Путь к картинке или CSS-цвет */
  value: string;
};

export const THEME_STORAGE_KEY = "theme";
export const BACKDROP_STORAGE_KEY = "theme-backdrop";
export const THEME_CHANGE_EVENT = "massage:theme-change";
export const BACKDROP_CHANGE_EVENT = "massage:backdrop-change";

export const themes = {
  design1: {
    id: "design1",
    label: "Дизайн 1",
    note: "Тёплый беж + шалфей, hero фото справа на десктопе.",
    colorScheme: "light",
    hasBackdropOptions: false,
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
    label: "Soft Earth",
    note: "Законсервирован: матовые плашки на фоне листвы, с выбором фона.",
    colorScheme: "dark",
    hasBackdropOptions: true,
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

/** Фоны для Дизайна 2 (Soft Earth). */
export const design2Backdrops: BackdropOption[] = [
  {
    id: "leaves-dense",
    label: "Густые листья",
    kind: "image",
    value: "/atmosphere/design3-leaves.jpg",
  },
  {
    id: "leaves-forest",
    label: "Лесная крона",
    kind: "image",
    value: "/atmosphere/leaves.png",
  },
  {
    id: "leaves-sage",
    label: "Шалфейные листья",
    kind: "image",
    value: "/atmosphere/sage-leaves.jpg",
  },
  {
    id: "emerald-weave",
    label: "Изумрудная ткань",
    kind: "image",
    value: "/atmosphere/emerald-weave.jpg",
  },
  {
    id: "color-moss",
    label: "Мох",
    kind: "color",
    value: "#1e3a2f",
  },
  {
    id: "color-earth",
    label: "Земля",
    kind: "color",
    value: "#2c241c",
  },
  {
    id: "color-olive",
    label: "Олива",
    kind: "color",
    value: "#243528",
  },
  {
    id: "color-ink",
    label: "Чернила",
    kind: "color",
    value: "#121816",
  },
];

export type ThemeId = keyof typeof themes;
export type BackdropId = (typeof design2Backdrops)[number]["id"];
export type AppearanceId = "light" | "dark";

export const APPEARANCE_STORAGE_KEY = "appearance";
export const APPEARANCE_CHANGE_EVENT = "massage:appearance-change";

/** Прод: Дизайн 1. Soft Earth законсервирован. */
export const lockedBackdropId = "color-moss" as const satisfies BackdropId;
export const lockedThemeId = "design1" as const satisfies ThemeId;

/** true = выбор дизайна (design1/design2) зафиксирован. */
export const themeSelectionLocked = true;

export const defaultThemeId: ThemeId = lockedThemeId;
export const defaultBackdropId: BackdropId = "leaves-dense";
export const defaultAppearanceId: AppearanceId = "light";

/** Тёмная палитра Дизайна 1 (солнышко). */
export const design1DarkTokens: DesignTokens = {
  background: "#1c1917",
  foreground: "#f2ebe3",
  muted: "#a89f96",
  accent: "#9aaf96",
  accentLight: "#2a3228",
  border: "#3a342f",
  card: "#25211e",
  heroSurface: "#1c1917",
  heroOverlay: "rgba(12, 10, 8, 0.42)",
  heroText: "#fffcf8",
  heroMuted: "rgba(255, 252, 248, 0.8)",
  heroCtaFg: "#2a2420",
  radiusCard: themes.design1.tokens.radiusCard,
  radiusControl: themes.design1.tokens.radiusControl,
  glass: "rgba(37, 33, 30, 0.72)",
  line: "rgba(242, 235, 227, 0.14)",
  glow: "rgba(154, 175, 150, 0.25)",
};

export const themeList: ThemeDefinition[] = Object.values(themes);

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return Boolean(value && value in themes);
}

export function isBackdropId(
  value: string | null | undefined,
): value is BackdropId {
  return Boolean(value && design2Backdrops.some((item) => item.id === value));
}

export function isAppearanceId(
  value: string | null | undefined,
): value is AppearanceId {
  return value === "light" || value === "dark";
}

export function resolveThemeId(stored: string | null): ThemeId {
  if (themeSelectionLocked) return lockedThemeId;
  // Soft Earth раньше был design3
  if (stored === "design3") return "design2";
  if (isThemeId(stored)) return stored;
  return defaultThemeId;
}

export function resolveBackdropId(stored: string | null): BackdropId {
  if (themeSelectionLocked) return lockedBackdropId;
  if (isBackdropId(stored)) return stored;
  return defaultBackdropId;
}

export function resolveAppearanceId(stored: string | null): AppearanceId {
  if (isAppearanceId(stored)) return stored;
  return defaultAppearanceId;
}

export function tokensForAppearance(appearance: AppearanceId): DesignTokens {
  return appearance === "dark" ? design1DarkTokens : themes.design1.tokens;
}

export function getBackdrop(id: BackdropId): BackdropOption {
  return (
    design2Backdrops.find((item) => item.id === id) ?? design2Backdrops[0]
  );
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
