# CardsGame

CardsGame — приложение для создания учебных карточек и повторения материала.

## Возможности

- Регистрация и вход с JWT-аутентификацией.
- Создание, редактирование, удаление и просмотр карточек.
- Сохранение черновиков и проверка ответов.
- Изоляция карточек по владельцу и хранение данных в SQLite.

## Стек

Frontend: React, TypeScript, Vite, Redux Toolkit Query, React Hook Form, Zod, SCSS Modules, Feature-Sliced Design.

Backend: Express 5, TypeScript, Prisma 8 RC, SQLite, bcrypt, JWT.

Инструменты: pnpm, Docker Compose, Nginx.

## Локальный запуск

Нужны Node.js 22+ и pnpm 10. Установите зависимости и настройте секрет:

```sh
pnpm install
pnpm --dir server install
```

Создайте `server/.env` на основе `server/.env.example` и задайте `JWT_SECRET`. Подготовьте базу:

```sh
pnpm --dir server exec prisma db update --db ./dev.db
```

Запустите API и frontend в отдельных терминалах:

```sh
pnpm --dir server dev
pnpm dev
```

Frontend: `http://localhost:5173`; API: `http://localhost:3000/api`.

## Docker

Скопируйте `.env.example` в `.env`, задайте `JWT_SECRET` и запустите:

```sh
docker compose up --build
```

Frontend: `http://localhost:8080`; API: `http://localhost:3000`. SQLite хранится в volume `cards-data`. Команда `docker compose down -v` удаляет volume и все данные.