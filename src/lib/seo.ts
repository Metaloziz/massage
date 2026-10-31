import { site } from "@/lib/content";

const defaultSiteUrl = "https://sasnouski.by";

export const siteUrl = (
  process.env.SITE_URL ?? defaultSiteUrl
).replace(/\/$/, "");

export const seo = {
  title: `${site.name} — кинезиомассаж в Минске и Молодечно`,
  description:
    "Кинезиомассаж и оздоровительный массаж у сертифицированного специалиста в Минске и Молодечно. Обучение классическому массажу. Запись в Telegram, WhatsApp, Viber — +375 (29) 570-56-37.",
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

export const ogImagePath = "/og/default.jpg";
export const ogImageUrl = absoluteUrl(ogImagePath);
