import {
  APPEARANCE_CHANGE_EVENT,
  APPEARANCE_STORAGE_KEY,
  BACKDROP_CHANGE_EVENT,
  BACKDROP_STORAGE_KEY,
  defaultAppearanceId,
  defaultBackdropId,
  defaultThemeId,
  design2Backdrops,
  getBackdrop,
  isAppearanceId,
  lockedBackdropId,
  lockedThemeId,
  resolveAppearanceId,
  resolveBackdropId,
  resolveThemeId,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  themeSelectionLocked,
  themes,
  tokensForAppearance,
  tokensToCssVars,
  type AppearanceId,
  type BackdropId,
  type ThemeId,
} from "@/design/themes";

export function getStoredThemeId(): ThemeId {
  if (themeSelectionLocked) return lockedThemeId;
  try {
    return resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return defaultThemeId;
  }
}

export function getStoredBackdropId(): BackdropId {
  if (themeSelectionLocked) return lockedBackdropId;
  try {
    return resolveBackdropId(localStorage.getItem(BACKDROP_STORAGE_KEY));
  } catch {
    return defaultBackdropId;
  }
}

export function getStoredAppearanceId(): AppearanceId {
  try {
    const stored = localStorage.getItem(APPEARANCE_STORAGE_KEY);
    if (isAppearanceId(stored)) return stored;
    // Старый ThemeToggle писал light/dark в ключ theme
    const legacy = localStorage.getItem(THEME_STORAGE_KEY);
    if (isAppearanceId(legacy)) return legacy;
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return defaultAppearanceId;
}

export function readDocumentThemeId(): ThemeId {
  if (typeof document === "undefined") return defaultThemeId;
  return resolveThemeId(document.documentElement.getAttribute("data-theme"));
}

export function readDocumentBackdropId(): BackdropId {
  if (typeof document === "undefined") return defaultBackdropId;
  return resolveBackdropId(
    document.documentElement.getAttribute("data-backdrop"),
  );
}

export function readDocumentAppearanceId(): AppearanceId {
  if (typeof document === "undefined") return defaultAppearanceId;
  return resolveAppearanceId(
    document.documentElement.getAttribute("data-appearance"),
  );
}

export function applyBackdrop(backdropId: BackdropId) {
  const id = themeSelectionLocked ? lockedBackdropId : backdropId;
  const backdrop = getBackdrop(id);
  const root = document.documentElement;

  root.setAttribute("data-backdrop", id);
  root.setAttribute("data-backdrop-kind", backdrop.kind);

  if (backdrop.kind === "color") {
    root.style.setProperty("--atmosphere-color", backdrop.value);
  } else {
    root.style.removeProperty("--atmosphere-color");
  }

  try {
    localStorage.setItem(BACKDROP_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }

  window.dispatchEvent(
    new CustomEvent(BACKDROP_CHANGE_EVENT, { detail: { backdropId: id } }),
  );
}

function applyDesignTokens(themeId: ThemeId, appearance: AppearanceId) {
  const root = document.documentElement;
  const tokens =
    themeId === "design1"
      ? tokensForAppearance(appearance)
      : themes[themeId].tokens;

  root.style.colorScheme =
    themeId === "design1" ? appearance : themes[themeId].colorScheme;

  const vars = tokensToCssVars(tokens);
  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }
}

export function applyAppearance(appearance: AppearanceId) {
  const root = document.documentElement;
  const themeId = getStoredThemeId();

  root.setAttribute("data-appearance", appearance);
  applyDesignTokens(themeId, appearance);

  try {
    localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
  } catch {
    /* ignore */
  }

  window.dispatchEvent(
    new CustomEvent(APPEARANCE_CHANGE_EVENT, {
      detail: { appearanceId: appearance },
    }),
  );
}

export function applyTheme(themeId: ThemeId) {
  const id = themeSelectionLocked ? lockedThemeId : themeId;
  const theme = themes[id];
  const root = document.documentElement;
  const appearance = getStoredAppearanceId();

  root.setAttribute("data-theme", id);
  applyDesignTokens(id, appearance);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }

  if (theme.hasBackdropOptions) {
    applyBackdrop(getStoredBackdropId());
  } else {
    root.removeAttribute("data-backdrop");
    root.removeAttribute("data-backdrop-kind");
    root.style.removeProperty("--atmosphere-color");
  }

  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { themeId: id } }),
  );
}

/** Inline-скрипт до гидрации — без мигания дизайна и светлой/тёмной палитры. */
export function getThemeBootstrapScript(): string {
  const catalog = Object.fromEntries(
    Object.entries(themes).map(([id, theme]) => [
      id,
      {
        colorScheme: theme.colorScheme,
        hasBackdropOptions: Boolean(theme.hasBackdropOptions),
        vars: tokensToCssVars(theme.tokens),
      },
    ]),
  );

  const darkVars = tokensToCssVars(tokensForAppearance("dark"));
  const lightVars = tokensToCssVars(tokensForAppearance("light"));

  const backdrops = Object.fromEntries(
    design2Backdrops.map((item) => [
      item.id,
      { kind: item.kind, value: item.value },
    ]),
  );

  return `(function(){try{
var THEME_KEY=${JSON.stringify(THEME_STORAGE_KEY)};
var BG_KEY=${JSON.stringify(BACKDROP_STORAGE_KEY)};
var APPEARANCE_KEY=${JSON.stringify(APPEARANCE_STORAGE_KEY)};
var catalog=${JSON.stringify(catalog)};
var lightVars=${JSON.stringify(lightVars)};
var darkVars=${JSON.stringify(darkVars)};
var backdrops=${JSON.stringify(backdrops)};
var locked=${JSON.stringify(themeSelectionLocked)};
var id=${JSON.stringify(lockedThemeId)};
var bgId=${JSON.stringify(lockedBackdropId)};
if(!locked){
  var stored=localStorage.getItem(THEME_KEY);
  if(stored==="design3")stored="design2";
  id=stored&&catalog[stored]?stored:${JSON.stringify(defaultThemeId)};
  var bgStored=localStorage.getItem(BG_KEY);
  bgId=bgStored&&backdrops[bgStored]?bgStored:${JSON.stringify(defaultBackdropId)};
}
var appearance=localStorage.getItem(APPEARANCE_KEY);
if(appearance!=="light"&&appearance!=="dark"){
  var legacy=localStorage.getItem(THEME_KEY);
  if(legacy==="light"||legacy==="dark")appearance=legacy;
  else appearance=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}
var theme=catalog[id];
var root=document.documentElement;
root.setAttribute("data-theme",id);
root.setAttribute("data-appearance",appearance);
root.style.colorScheme=id==="design1"?appearance:theme.colorScheme;
var vars=id==="design1"?(appearance==="dark"?darkVars:lightVars):theme.vars;
for(var k in vars){if(Object.prototype.hasOwnProperty.call(vars,k))root.style.setProperty(k,vars[k]);}
localStorage.setItem(THEME_KEY,id);
localStorage.setItem(APPEARANCE_KEY,appearance);
if(theme.hasBackdropOptions){
  var bg=backdrops[bgId];
  root.setAttribute("data-backdrop",bgId);
  root.setAttribute("data-backdrop-kind",bg.kind);
  if(bg.kind==="color")root.style.setProperty("--atmosphere-color",bg.value);
  else root.style.removeProperty("--atmosphere-color");
  localStorage.setItem(BG_KEY,bgId);
}else{
  root.removeAttribute("data-backdrop");
  root.removeAttribute("data-backdrop-kind");
  root.style.removeProperty("--atmosphere-color");
}
}catch(e){}})();`;
}
