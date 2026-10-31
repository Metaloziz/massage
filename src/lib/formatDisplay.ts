const RU_MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

/** Уже человекочитаемая дата (с кириллицей) — не трогаем. */
function looksHumanDate(value: string) {
  return /[а-яё]/i.test(value);
}

/**
 * Google Sheets / Apps Script часто отдают Date как:
 * "Sat Oct 03 2026 00:00:00 GMT+0300 (Moscow Standard Time)"
 * или ISO "2026-10-03".
 */
function parseSheetDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const isoDay = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoDay) {
    const year = Number(isoDay[1]);
    const month = Number(isoDay[2]) - 1;
    const day = Number(isoDay[3]);
    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;

  // Чистые числа вроде "550" не считаем датой.
  if (/^\d+([.,]\d+)?$/.test(trimmed)) return null;

  return parsed;
}

export function formatDisplayDate(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || looksHumanDate(trimmed)) return trimmed;

  const date = parseSheetDate(trimmed);
  if (!date) return trimmed;

  return `${date.getDate()} ${RU_MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

/** Число из таблицы → "550 руб."; уже готовая строка не меняется. */
export function formatEducationPrice(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^\d+([.,]\d+)?$/.test(trimmed)) {
    return `${trimmed.replace(".", ",")} руб.`;
  }
  return trimmed;
}
