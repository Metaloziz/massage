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

## Прод: sasnouski.by

Основной сайт: **https://sasnouski.by** (корень домена, без `BASE_PATH`).

Сборка статики для прода:

```bash
# Windows (PowerShell)
$env:SITE_URL="https://sasnouski.by"; npm run build

# macOS / Linux
SITE_URL=https://sasnouski.by npm run build
```

`BASE_PATH` не задавайте (пустой). Статика в `out/` — залейте на хост организации. DNS/CNAME для `sasnouski.by` настраиваются у регистратора.

## Превью: GitHub Pages

Сайт также публикуется при пуше в `master` через GitHub Actions — это **превью**, не прод.

**URL превью:** https://metaloziz.github.io/massage/

### Первоначальная настройка Pages

1. Запушьте изменения в `master`.
2. В репозитории на GitHub: **Settings → Pages → Build and deployment → Source** → выберите **GitHub Actions**.
3. Дождитесь завершения workflow во вкладке **Actions**.
4. Откройте https://metaloziz.github.io/massage/

### Ручной перезапуск деплоя

Во вкладке **Actions** выберите workflow «Deploy to GitHub Pages» и нажмите **Run workflow**.

### Локальная проверка сборки превью

```bash
# Windows (PowerShell)
$env:BASE_PATH="/massage"; $env:SITE_URL="https://metaloziz.github.io/massage"; npm run build

# macOS / Linux
BASE_PATH=/massage SITE_URL=https://metaloziz.github.io/massage npm run build
```

Статические файлы появятся в папке `out/`.

## SEO и смена домена

Сайт оптимизирован для поиска по запросам в **Минске** и **Молодечно**: meta-теги, Open Graph, favicon, `site.webmanifest`, JSON-LD, `robots.txt` и `sitemap.xml`.

### Переменные окружения при сборке

| Переменная | Назначение | Прод (`sasnouski.by`) | GitHub Pages (превью) |
|------------|----------|----------------------|------------------------|
| `BASE_PATH` | Префикс путей на сервере | *(пусто)* | `/massage` |
| `SITE_URL` | Canonical, sitemap, Open Graph | `https://sasnouski.by` | `https://metaloziz.github.io/massage` |
| `NEXT_PUBLIC_GAS_API_KEY` | API key Apps Script (CMS) | задать при сборке `out/` | задать при сборке |

URL Web App — константа [`GAS_API_URL`](src/lib/api.ts) в коде (как в zeuzyki). Прод — статика (`out/`) на хосте организации; ключ выставляйте в том пайплайне, где собираете релиз. Workflow GitHub Pages — только превью.

### После деплоя на sasnouski.by

1. Проверьте favicon во вкладке и превью ссылки (OG): https://sasnouski.by
2. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — вставьте URL и сбросьте кэш превью
3. [Яндекс Вебмастер](https://webmaster.yandex.ru/) — добавьте сайт, подтвердите владение, sitemap: `https://sasnouski.by/sitemap.xml`
4. [Google Search Console](https://search.google.com/search-console) — то же самое
5. Проверьте, что в карточках на Яндекс и Google Картах указана ссылка на https://sasnouski.by
6. Пиксели Meta / Яндекс.Метрика / Google Ads — подключаются отдельно, когда будут ID

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
