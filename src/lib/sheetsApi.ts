import { GAS_API_URL, getContentCacheKey } from "@/lib/api";
import {
  getDefaultContent,
  mergeRemoteContent,
  type ContentBundle,
  type RemoteContentPayload,
} from "@/lib/remoteContent";

const API_URL = GAS_API_URL.trim();
const API_KEY = (process.env.NEXT_PUBLIC_GAS_API_KEY ?? "").trim();

type ContentCache = {
  savedAt: number;
  payload: RemoteContentPayload;
};

export type FetchContentOptions = {
  onRefreshStart?: () => void;
  onRefreshComplete?: () => void;
  onRefreshError?: (error: unknown) => void;
  onUpdate?: (content: ContentBundle) => void;
};

function isConfigured() {
  return Boolean(API_URL && API_KEY);
}

function getCacheKey() {
  return getContentCacheKey(API_URL, API_KEY);
}

function getCachedPayload(): RemoteContentPayload | null {
  if (typeof window === "undefined") return null;

  const cacheKey = getCacheKey();

  try {
    const raw = window.localStorage.getItem(cacheKey);
    if (!raw) return null;

    const cache = JSON.parse(raw) as Partial<ContentCache>;
    if (!cache.savedAt || !cache.payload || cache.payload.ok !== true) {
      window.localStorage.removeItem(cacheKey);
      return null;
    }

    return cache.payload;
  } catch {
    window.localStorage.removeItem(cacheKey);
    return null;
  }
}

function setCachedPayload(payload: RemoteContentPayload) {
  if (typeof window === "undefined") return;

  try {
    const cache: ContentCache = {
      savedAt: Date.now(),
      payload,
    };
    window.localStorage.setItem(getCacheKey(), JSON.stringify(cache));
  } catch {
    // localStorage can be unavailable or full; site must still work from defaults.
  }
}

function areBundlesEqual(a: ContentBundle, b: ContentBundle) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function toBundle(payload: RemoteContentPayload): ContentBundle {
  return mergeRemoteContent(getDefaultContent(), payload);
}

async function fetchContentFromApi(): Promise<ContentBundle> {
  const url = new URL(API_URL);
  url.searchParams.set("action", "content");
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) {
    throw new Error(`Ошибка загрузки контента: HTTP ${res.status}`);
  }

  const json = (await res.json()) as RemoteContentPayload;
  if (!json.ok) {
    throw new Error(`Ошибка API контента: ${json.error ?? "unknown"}`);
  }

  setCachedPayload(json);
  return toBundle(json);
}

async function refreshCachedContent(
  cached: ContentBundle,
  options: FetchContentOptions,
) {
  options.onRefreshStart?.();

  try {
    const fresh = await fetchContentFromApi();
    if (!areBundlesEqual(cached, fresh)) {
      options.onUpdate?.(fresh);
    }
  } catch (error) {
    options.onRefreshError?.(error);
  } finally {
    options.onRefreshComplete?.();
  }
}

/**
 * Stale-while-revalidate как в zeuzyki:
 * есть кэш → сразу отдать, в фоне обновить;
 * нет кэша → один запрос (или fallback на content.ts).
 */
export async function fetchRemoteContent(
  options: FetchContentOptions = {},
): Promise<ContentBundle> {
  const fallback = getDefaultContent();

  if (!isConfigured()) {
    return fallback;
  }

  const cachedPayload = getCachedPayload();
  if (cachedPayload) {
    const cached = toBundle(cachedPayload);
    void refreshCachedContent(cached, options);
    return cached;
  }

  try {
    return await fetchContentFromApi();
  } catch (error) {
    options.onRefreshError?.(error);
    return fallback;
  }
}
