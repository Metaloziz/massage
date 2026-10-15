import { heroImage, site } from "@/lib/content";

const defaultSiteUrl = "https://metaloziz.github.io/massage";

export const siteUrl = (
  process.env.SITE_URL ?? defaultSiteUrl
).replace(/\/$/, "");

export const seo = {
  title: `${site.name} — кинезиомассаж, массаж и обучение в Минске и Молодечно`,
  description:
    "Кинезиомассаж, общеоздоровительный массаж и обучение классическому массажу в Минске и Молодечно. Запись через Telegram, WhatsApp, Viber. Тел. +375 (29) 570-56-37.",
  keywords: [
    "массажист Минск",
    "массажист Молодечно",
    "кинезиомассаж Минск",
    "кинезиомассаж Молодечно",
    "массаж Минск",
    "массаж Молодечно",
    "обучение массажу Молодечно",
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
