# CardsGame

CardsGame — приложение для создания учебных карточек и повторения материала. Пользователи могут регистрироваться, сохранять черновики, редактировать свои карточки и проверять ответы.

## Что реализовано

- Регистрация и вход с JWT-аутентификацией.
- Создание, просмотр, редактирование и удаление карточек; черновики сохраняются отдельно.
- Проверка ответов и изоляция карточек по владельцу.
- Постоянное хранение пользователей и карточек в SQLite.
- Запуск frontend и backend через Docker Compose с сохранением базы данных в volume.

## Стек

Frontend: React, TypeScript, Vite, Redux Toolkit Query, React Hook Form, Zod, SCSS modules, Feature-Sliced Design.

Backend: Express 5, TypeScript, Prisma 8 RC, SQLite, bcrypt, JWT.

Инструменты: pnpm, Docker Compose, Nginx.

## Локальный запуск

Нужны Node.js 22+ и pnpm 10.

```sh
pnpm install
pnpm --dir server install
```

Создайте `server/.env` на основе `server/.env.example` и задайте собственный `JWT_SECRET`. Подготовьте SQLite:

```sh
pnpm --dir server exec prisma db update --db ./dev.db
```

Запустите backend и frontend в отдельных терминалах:

```sh
pnpm --dir server dev
```

```sh
pnpm dev
```

Frontend: `http://localhost:5173`. API: `http://localhost:3000/api`.

## Запуск в Docker

Скопируйте `.env.example` в `.env`, задайте `JWT_SECRET`, затем выполните:

```sh
docker compose up --build
```

Frontend: `http://localhost:8080`. API: `http://localhost:3000`. SQLite хранится в Docker volume `cards-data` и сохраняется после остановки контейнеров. `docker compose down -v` удаляет volume вместе с данными.

## Проверки

```sh
pnpm build
pnpm --dir server exec tsc --noEmit -p src/tsconfig.json
pnpm --dir server test
pnpm --dir server build
```

В Docker-сборке SQLite-схему перед запуском API применяет сервис `db-init`.

