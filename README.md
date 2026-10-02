# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # CardsGame

  CardsGame is a flashcard learning application. Users register and sign in, create cards, save drafts, review their cards, edit or delete them, and check answers.

  ## Stack

  - Frontend: React, TypeScript, Vite, Redux Toolkit Query, React Hook Form, Zod, SCSS modules, Feature-Sliced Design.
  - Backend: Express 5, TypeScript, bcrypt, JWT, Prisma 8 RC, SQLite.
  - Deployment: Docker Compose, Nginx, Node.js 22.

  ## Local development

  Requirements: Node.js 22 or newer and pnpm 10.

  Install dependencies from the repository root and backend package:

  ```sh
  pnpm install
  pnpm --dir server install
  ```

  Create `server/.env` from `server/.env.example` and set a private `JWT_SECRET`. Then run the API and frontend in separate terminals:

  ```sh
  pnpm --dir server dev
  ```

  ```sh
  pnpm dev
  ```

  The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:3000`. Set `VITE_API_URL` to `http://localhost:3000/api` in the frontend environment.

  SQLite data is stored in `server/dev.db` during local development. The Prisma contract source is `server/src/prisma/contract.prisma`; generated contract artifacts are emitted by Prisma CLI and must not be edited manually.

  ## Docker Compose

  Copy the root `.env.example` to `.env`, replace `JWT_SECRET` with a long random value, then build and start both services:

  ```sh
  docker compose up --build
  ```

  The frontend is available at `http://localhost:8080` and the API at `http://localhost:3000`. Compose stores SQLite data in the persistent `cards-data` volume. `VITE_API_URL`, `BACKEND_PORT`, and `FRONTEND_PORT` can be overridden in `.env`; because Vite embeds its API URL at build time, rebuild the frontend image after changing `VITE_API_URL`.

  Stop the services with `docker compose down`. The named database volume is retained; `docker compose down -v` also removes it and permanently deletes its data.

  ## API

  Protected routes require `Authorization: Bearer <token>`.

  | Method | Path | Purpose |
  | --- | --- | --- |
  | `POST` | `/api/auth/register` | Create an account |
  | `POST` | `/api/auth/login` | Sign in |
  | `GET` | `/api/auth/me` | Return the authenticated user |
  | `POST` | `/api/auth/logout` | Complete client-side JWT logout |
  | `GET` | `/api/user/profile` | Return the authenticated user's profile |
  | `GET` | `/api/cards` | List the user's published cards |
  | `GET` | `/api/cards/:cardId` | Read an owned card |
  | `POST` | `/api/cards` | Create a published card |
  | `POST` | `/api/cards/drafts` | Save a draft |
  | `PATCH` | `/api/cards/:id` | Partially update an owned card |
  | `DELETE` | `/api/cards/:id` | Delete an owned card |
  | `POST` | `/api/cards/:cardId/answer` | Check an answer for an owned published card |

  Card tags are `string[]` in the API and JSON-encoded text in SQLite. Card IDs are server-generated UUIDs; ownership is enforced by the authenticated user ID.

  ## Checks

  ```sh
  pnpm build
  pnpm --dir server exec tsc --noEmit -p src/tsconfig.json
  pnpm --dir server test
  pnpm --dir server build
  pnpm --dir server exec prisma db verify --db ./dev.db
  ```
