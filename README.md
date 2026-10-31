This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Деплой на GitHub Pages

Сайт публикуется автоматически при пуше в ветку `master` через GitHub Actions.

**URL после деплоя:** https://metaloziz.github.io/massage/

### Первоначальная настройка

1. Запушьте изменения в `master`.
2. В репозитории на GitHub: **Settings → Pages → Build and deployment → Source** → выберите **GitHub Actions**.
3. Дождитесь завершения workflow во вкладке **Actions**.
4. Откройте https://metaloziz.github.io/massage/

### Ручной перезапуск деплоя

Во вкладке **Actions** выберите workflow «Deploy to GitHub Pages» и нажмите **Run workflow**.

### Локальная проверка сборки

```bash
# Windows (PowerShell)
$env:BASE_PATH="/massage"; npm run build

# macOS / Linux
BASE_PATH=/massage npm run build
```

Статические файлы появятся в папке `out/`.

## SEO и смена домена

Сайт оптимизирован для поиска по запросам в **Минске** и **Молодечно**: meta-теги, Open Graph, JSON-LD, `robots.txt` и `sitemap.xml`.

### Переменные окружения при сборке

| Переменная | Назначение | Значение для GitHub Pages |
|------------|----------|-------------------------|
| `BASE_PATH` | Префикс путей на сервере | `/massage` |
| `SITE_URL` | Canonical, sitemap, Open Graph | `https://metaloziz.github.io/massage` |
| `NEXT_PUBLIC_GAS_API_KEY` | API key Apps Script (CMS) | задать при сборке `out/` |

URL Web App — константа [`GAS_API_URL`](src/lib/api.ts) в коде (как в zeuzyki). Прод — статика (`out/`) на хосте организации; ключ выставляйте в том пайплайне, где собираете релиз. Workflow GitHub Pages — только превью.

## CMS: Google Sheets

Цены, контакты, расписание обучения и адреса кабинетов можно менять в таблице без редеплоя. Сайт — статика, данные подтягивает браузер (как в zeuzyki): кэш в `localStorage`, фоновое обновление.

Таблица: https://docs.google.com/spreadsheets/d/1kM48FjY9NMOe421ZBdtSVLJrvdxbtJb58girp_Qx2H4

### Настройка один раз

1. Откройте таблицу → **Extensions → Apps Script**.
2. Вставьте код из [`scripts/google-apps-content.gs`](scripts/google-apps-content.gs).
3. **Project Settings → Script properties** → добавьте `API_KEY` (любой секрет).
4. В редакторе выберите функцию `seedSheetsOnce` → **Run** (вкладки Контакты / Услуги / Цены / Обучение / Кабинеты + Справка, цвета и описания).
5. **Deploy → New deployment → Web app**: Execute as *Me*, Who has access *Anyone*.
6. URL `/exec` вставьте в [`src/lib/api.ts`](src/lib/api.ts) (`GAS_API_URL`).
7. Локально: `.env.local` → `NEXT_PUBLIC_GAS_API_KEY=...` (см. [`.env.example`](.env.example)).
8. На проде: тот же ключ при сборке. Без ключа/URL — fallback из [`src/lib/content.ts`](src/lib/content.ts).

### После деплоя

1. [Яндекс Вебмастер](https://webmaster.yandex.ru/) — добавьте сайт, подтвердите владение, укажите sitemap: `https://ваш-домен/sitemap.xml`
2. [Google Search Console](https://search.google.com/search-console) — то же самое
3. Проверьте, что в карточках на Яндекс и Google Картах указана актуальная ссылка на сайт
