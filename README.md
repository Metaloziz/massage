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
