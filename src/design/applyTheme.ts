import {
  defaultThemeId,
  resolveThemeId,
  THEME_STORAGE_KEY,
  themes,
  tokensToCssVars,
  type ThemeId,
} from "@/design/themes";

export function getStoredThemeId(): ThemeId {
  try {
    return resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return defaultThemeId;
  }
}

export function applyTheme(themeId: ThemeId) {
  const theme = themes[themeId];
  const root = document.documentElement;

  root.setAttribute("data-theme", themeId);
  root.style.colorScheme = theme.colorScheme;

  const vars = tokensToCssVars(theme.tokens);
  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    /* ignore */
  }
}

/** Inline-скрипт до гидрации — без мигания темы. */
export function getThemeBootstrapScript(): string {
  const catalog = Object.fromEntries(
    Object.entries(themes).map(([id, theme]) => [
      id,
      {
        colorScheme: theme.colorScheme,
        vars: tokensToCssVars(theme.tokens),
      },
    ]),
  );

  return `(function(){try{var KEY=${JSON.stringify(THEME_STORAGE_KEY)};var catalog=${JSON.stringify(catalog)};var fallback=${JSON.stringify(defaultThemeId)};var stored=localStorage.getItem(KEY);var id=stored&&catalog[stored]?stored:fallback;var theme=catalog[id];var root=document.documentElement;root.setAttribute("data-theme",id);root.style.colorScheme=theme.colorScheme;for(var k in theme.vars){if(Object.prototype.hasOwnProperty.call(theme.vars,k))root.style.setProperty(k,theme.vars[k]);}if(stored!==id)localStorage.setItem(KEY,id);}catch(e){}})();`;
}
