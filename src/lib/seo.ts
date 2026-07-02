import { heroImage, site } from "@/lib/content";

const defaultSiteUrl = "https://metaloziz.github.io/massage";

export const siteUrl = (
  process.env.SITE_URL ?? defaultSiteUrl
).replace(/\/$/, "");

export const seo = {
  title: `${site.name} — кинезиомассаж и массаж в Минске и Молодечно`,
  description:
    "Кинезиомассаж и массаж в Минске и Молодечно. Кабинеты на ул. Тепличная и в д. Тюрли. Запись в Instagram и Telegram. Тел. +375 (29) 570-56-37.",
  keywords: [
    "массажист Минск",
    "массажист Молодечно",
    "кинезиомассаж Минск",
    "кинезиомассаж Молодечно",
    "массаж Минск",
    "массаж Молодечно",
    "Сосновский Алексей",
    "массажный кабинет Минск",
    "кинезиология массаж",
  ],
  areas: ["Минск", "Молодечно", "Минская область"],
} as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export const ogImageUrl = absoluteUrl(heroImage);
