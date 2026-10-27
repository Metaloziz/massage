import {
  BACKDROP_CHANGE_EVENT,
  BACKDROP_STORAGE_KEY,
  defaultBackdropId,
  defaultThemeId,
  design2Backdrops,
  getBackdrop,
  resolveBackdropId,
  resolveThemeId,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  themes,
  tokensToCssVars,
  type BackdropId,
  type ThemeId,
} from "@/design/themes";

export function getStoredThemeId(): ThemeId {
  try {
    return resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return defaultThemeId;
  }
}

export function getStoredBackdropId(): BackdropId {
  try {
    return resolveBackdropId(localStorage.getItem(BACKDROP_STORAGE_KEY));
  } catch {
    return defaultBackdropId;
  }
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

export function applyBackdrop(backdropId: BackdropId) {
  const backdrop = getBackdrop(backdropId);
  const root = document.documentElement;

  root.setAttribute("data-backdrop", backdropId);
  root.setAttribute("data-backdrop-kind", backdrop.kind);

  if (backdrop.kind === "color") {
    root.style.setProperty("--atmosphere-color", backdrop.value);
  } else {
    root.style.removeProperty("--atmosphere-color");
  }

  try {
    localStorage.setItem(BACKDROP_STORAGE_KEY, backdropId);
  } catch {
    /* ignore */
  }

  window.dispatchEvent(
    new CustomEvent(BACKDROP_CHANGE_EVENT, { detail: { backdropId } }),
  );
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

  if (theme.hasBackdropOptions) {
    applyBackdrop(getStoredBackdropId());
  } else {
    root.removeAttribute("data-backdrop");
    root.removeAttribute("data-backdrop-kind");
    root.style.removeProperty("--atmosphere-color");
  }

  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { themeId } }),
  );
}

/** Inline-скрипт до гидрации — без мигания темы и фона. */
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

  const backdrops = Object.fromEntries(
    design2Backdrops.map((item) => [
      item.id,
      { kind: item.kind, value: item.value },
    ]),
  );

  return `(function(){try{
var THEME_KEY=${JSON.stringify(THEME_STORAGE_KEY)};
var BG_KEY=${JSON.stringify(BACKDROP_STORAGE_KEY)};
var catalog=${JSON.stringify(catalog)};
var backdrops=${JSON.stringify(backdrops)};
var fallback=${JSON.stringify(defaultThemeId)};
var bgFallback=${JSON.stringify(defaultBackdropId)};
var stored=localStorage.getItem(THEME_KEY);
if(stored==="design3")stored="design2";
var id=stored&&catalog[stored]?stored:fallback;
var theme=catalog[id];
var root=document.documentElement;
root.setAttribute("data-theme",id);
root.style.colorScheme=theme.colorScheme;
for(var k in theme.vars){if(Object.prototype.hasOwnProperty.call(theme.vars,k))root.style.setProperty(k,theme.vars[k]);}
if(localStorage.getItem(THEME_KEY)!==id)localStorage.setItem(THEME_KEY,id);
if(theme.hasBackdropOptions){
  var bgStored=localStorage.getItem(BG_KEY);
  var bgId=bgStored&&backdrops[bgStored]?bgStored:bgFallback;
  var bg=backdrops[bgId];
  root.setAttribute("data-backdrop",bgId);
  root.setAttribute("data-backdrop-kind",bg.kind);
  if(bg.kind==="color")root.style.setProperty("--atmosphere-color",bg.value);
  else root.style.removeProperty("--atmosphere-color");
  if(bgStored!==bgId)localStorage.setItem(BG_KEY,bgId);
}else{
  root.removeAttribute("data-backdrop");
  root.removeAttribute("data-backdrop-kind");
  root.style.removeProperty("--atmosphere-color");
}
}catch(e){}})();`;
}
