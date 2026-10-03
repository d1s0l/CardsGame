# CardsGame

## English

CardsGame is a flashcard app for creating study cards, saving drafts, and checking answers. It uses JWT authentication and stores user-owned cards in SQLite.

**Stack:** React, TypeScript, Vite, Redux Toolkit Query, Express 5, Prisma 8 RC, SQLite, bcrypt, JWT.

### Run locally

Requirements: Node.js 22+ and pnpm 10. Install dependencies:

```sh
pnpm install
pnpm --dir server install
```

Set `JWT_SECRET` in `server/.env` (copy `server/.env.example`), then prepare the database:

```sh
pnpm --dir server exec prisma db update --db ./dev.db
```

Run these commands in separate terminals:

```sh
pnpm --dir server dev
pnpm dev
```

Frontend: `http://localhost:5173`. API: `http://localhost:3000/api`.

### Run with Docker

Copy `.env.example` to `.env`, set `JWT_SECRET`, then run:

```sh
docker compose up --build
```

Frontend: `http://localhost:8080`. API: `http://localhost:3000`. SQLite data is stored in the `cards-data` volume.

## Русский

CardsGame — приложение для создания учебных карточек, сохранения черновиков и проверки ответов. Использует JWT-аутентификацию и хранит карточки пользователей в SQLite.

**Стек:** React, TypeScript, Vite, Redux Toolkit Query, Express 5, Prisma 8 RC, SQLite, bcrypt, JWT.

### Локальный запуск

Нужны Node.js 22+ и pnpm 10. Установите зависимости:

```sh
pnpm install
pnpm --dir server install
```

Задайте `JWT_SECRET` в `server/.env` (создайте его из `server/.env.example`) и подготовьте базу:

```sh
pnpm --dir server exec prisma db update --db ./dev.db
```

Запустите команды в отдельных терминалах:

```sh
pnpm --dir server dev
pnpm dev
```

Frontend: `http://localhost:5173`. API: `http://localhost:3000/api`.

### Запуск в Docker

Скопируйте `.env.example` в `.env`, задайте `JWT_SECRET` и запустите:

```sh
docker compose up --build
```

Frontend: `http://localhost:8080`. API: `http://localhost:3000`. Данные SQLite сохраняются в volume `cards-data`.