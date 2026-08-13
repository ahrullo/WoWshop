# WoWshop 🛍️✨

Интернет-магазин необычных товаров: светильники, игрушки, канцтовары, аниме-мерч, необычная техника
и аксессуары для телефонов.

Стек: **Next.js 16 (App Router, TypeScript)** + **Prisma** + **PostgreSQL (Neon)** + **Tailwind CSS** +
**Stripe Checkout**.

## Быстрый старт (локально)

1. Создайте бесплатную базу данных на [neon.tech](https://neon.tech) (см. шаг 1 в разделе «Деплой» ниже)
   и вставьте connection string в `DATABASE_URL` в файле `.env`.
2. Установите зависимости и накатите схему:
   ```bash
   npm install
   npx prisma migrate dev --name init
   ```
3. Запустите сайт:
   ```bash
   npm run dev
   ```

Откройте [http://localhost:3000](http://localhost:3000).

> На Windows dev-сервер запускается с флагом `--webpack` (`next dev --webpack`) — Turbopack на Windows
> падает при попытке создать junction point для `node_modules/@prisma/client` без прав администратора.
> Это уже настроено в `package.json`, ничего делать не нужно.

## Переменные окружения

Полный список с описанием — в [`.env.example`](.env.example). Ключевые:

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | Connection string Postgres (Neon) |
| `ADMIN_PASSWORD` | Пароль входа в `/admin` |
| `NEXT_PUBLIC_BASE_URL` | URL сайта — для редиректов Stripe |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Пустые = демо-режим оплаты без реального Stripe |

## Админка

`/admin`, пароль по умолчанию — `wowshop123` (`ADMIN_PASSWORD` в `.env`). CRUD товаров + список заказов.

## Деплой в интернет (Vercel + Neon)

Локальный SQLite-файл не подходит для облака (Vercel — serverless, файловая система эфемерна), поэтому
используется управляемый Postgres. Всё бесплатно на старте.

### 1. База данных — Neon

1. Зарегистрируйтесь на [neon.tech](https://neon.tech) (можно через GitHub).
2. Создайте новый проект (регион — любой, например Frankfurt).
3. В Dashboard → Connect → выберите **Prisma** во вкладке "Connection string", скопируйте строку вида
   `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`.
4. Вставьте её в `DATABASE_URL` в `.env`.
5. Примените схему и засейте демо-товары:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

### 2. Код — GitHub

```bash
git init
git add .
git commit -m "Initial commit"
```

Создайте пустой репозиторий на [github.com/new](https://github.com/new) (без README/gitignore — они уже
есть локально), затем:

```bash
git remote add origin https://github.com/<ваш-логин>/wowshop.git
git branch -M main
git push -u origin main
```

`.env` в репозиторий не попадёт — он в `.gitignore`.

### 3. Хостинг — Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com) через GitHub.
2. **Add New → Project**, выберите репозиторий `wowshop` → **Import**.
3. Vercel сам определит Next.js. В разделе **Environment Variables** добавьте те же переменные, что в
   `.env`: `DATABASE_URL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_BASE_URL` (после первого деплоя замените на
   реальный `https://<ваш-проект>.vercel.app`), и Stripe-ключи (если уже подключали).
4. Нажмите **Deploy**. Через 1–2 минуты сайт будет доступен по адресу `https://<ваш-проект>.vercel.app`.
5. После первого деплоя обновите `NEXT_PUBLIC_BASE_URL` на реальный домен и передеплойте
   (Deployments → ⋯ → Redeploy), иначе Stripe будет редиректить на localhost.

Дальнейшие пуши в `main` на GitHub будут автоматически деплоиться на Vercel.

## Подключение реальной оплаты (Stripe)

Пока `STRIPE_SECRET_KEY` пустой, оформление заказа работает в **демо-режиме**: заказ сохраняется в базу,
но реальной оплаты не происходит.

1. Зарегистрируйтесь на [stripe.com](https://stripe.com), включите **тестовый режим**.
2. Developers → API keys → скопируйте **Secret key** в `STRIPE_SECRET_KEY` (локально и на Vercel).
3. Для вебхука локально — [Stripe CLI](https://docs.stripe.com/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   выведет `whsec_...` → вставьте в `STRIPE_WEBHOOK_SECRET`.
4. Для прода — Developers → Webhooks → Add endpoint → URL `https://<ваш-домен>/api/webhooks/stripe`,
   событие `checkout.session.completed`, скопируйте Signing secret в `STRIPE_WEBHOOK_SECRET` на Vercel.
5. Тестовая карта: `4242 4242 4242 4242`, любая будущая дата, любой CVC.

> Stripe в настоящий момент не работает с юрлицами/физлицами из РФ напрямую — для реального запуска
> магазина в России потребуется другой платёжный провайдер. Интеграция здесь демонстрирует техническую
> схему (Checkout + вебхук) и подходит для теста/обучения.

## Структура проекта

```
prisma/schema.prisma       — модели Product, Order, OrderItem
prisma/seed.ts             — демо-товары
src/lib/prisma.ts          — Prisma Client (адаптер Neon)
src/lib/stripe.ts          — Stripe Client
src/lib/adminAuth.ts       — простая cookie-авторизация админки
src/components/CartContext — корзина на localStorage (React Context)
src/app/
  page.tsx                 — главная
  catalog/[category]       — каталог по категориям
  product/[slug]           — карточка товара
  cart, checkout           — корзина и оформление заказа
  order/success, order/cancel
  admin/                   — логин, товары, заказы
  api/webhooks/stripe      — обработчик вебхука Stripe
```

## Полезные команды

```bash
npx prisma studio     # визуальный просмотр базы данных
npx prisma db seed    # повторно засеять демо-товары
npm run build          # прод-сборка
```
