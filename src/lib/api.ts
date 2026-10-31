/** Web App URL Apps Script — вставить после Deploy → /exec (как GAS_API_URL в zeuzyki). */
export const GAS_API_URL =
  "https://script.google.com/macros/s/AKfycbz7i1axTF6xvgFuI7cNpOOgVqPhhk6_DYaFwIoyfPmuqaeQlNbXSWQXOOFqPt-f1Y-7/exec";

export const CONTENT_CACHE_VERSION = 1;

export function getContentCacheKey(apiUrl: string, apiKey: string): string {
  return `massage:content:v${CONTENT_CACHE_VERSION}:${apiUrl}:${apiKey.slice(0, 8)}`;
}
