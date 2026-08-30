# 🧠 Flashcards Platform — Frontend

Платформа для создания, изучения и обмена наборами учебных карточек.

Пользователь может создавать собственные наборы карточек, изучать их с помощью интервального повторения, отслеживать прогресс и находить публичные наборы других пользователей.

---

## 📌 Основные возможности

### 🔐 Authentication

* Регистрация
* Авторизация
* Выход из аккаунта
* Защищённые маршруты
* Получение текущего пользователя
* Хранение состояния авторизации

### 📚 Decks

Пользователь может:

* создавать наборы карточек;
* редактировать набор;
* удалять набор;
* указывать название;
* добавлять описание;
* выбирать категорию;
* делать набор публичным или приватным;
* просматривать собственные наборы;
* сохранять чужие публичные наборы.

Пример:

```text
React Interview
Go Basics
English B2
System Design
```

### 🃏 Cards

Каждая карточка содержит:

```text
Question / Term
        ↓
Answer / Explanation
```

Доступные действия:

* создание карточки;
* редактирование;
* удаление;
* просмотр;
* изучение.

### 🎓 Study

Режим изучения набора.

После просмотра карточки пользователь оценивает свои знания:

```text
❌ Не знаю
🟡 Сложно
🟢 Знаю
🔥 Легко
```

Результат используется для определения того, когда карточку необходимо показать снова.

В дальнейшем планируется полноценный алгоритм **Spaced Repetition**.

### 📊 Dashboard

Главная страница пользователя содержит:

* количество изученных карточек;
* количество карточек, изученных сегодня;
* accuracy;
* streak;
* прогресс по наборам;
* количество карточек, ожидающих повторения;
* график активности.

Главная задача Dashboard:

> Показать пользователю, что он уже выучил и что ему необходимо повторить сегодня.

### 👤 Profile

Профиль пользователя содержит:

* username;
* avatar;
* созданные наборы;
* сохранённые наборы;
* статистику;
* публичные наборы.

### 🔎 Discovery

Каталог публичных наборов.

Основные категории:

* Популярное
* Новое
* React
* Go
* Английский
* Алгоритмы
* System Design

Пользователь может найти интересующий набор и сохранить его себе.

---

# 🛠 Tech Stack

### Core

* React
* TypeScript
* Vite

### State Management

* Redux Toolkit
* RTK Query

### Forms

* React Hook Form
* Zod

### Routing

* React Router

### Styling

* SCSS
* SCSS Modules

### Architecture

* Feature-Sliced Design (FSD)

### Code Quality

* ESLint
* Prettier

---

# 🏗 Architecture

Проект построен согласно принципам **Feature-Sliced Design**.

Основные слои:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

## `app`

Глобальная конфигурация приложения.

```text
app/
├── providers/
├── router/
├── store/
├── styles/
└── App.tsx
```

Здесь находятся:

* Redux Store;
* RTK Query API;
* Router;
* глобальные стили;
* Provider'ы;
* конфигурация приложения.

---

## `pages`

Полноценные страницы приложения.

Пример:

```text
pages/
├── HomePage/
├── LoginPage/
├── RegisterPage/
├── DashboardPage/
├── ProfilePage/
├── DeckPage/
├── StudyPage/
└── DiscoveryPage/
```

Page отвечает за композицию страницы, а не за реализацию отдельных бизнес-функций.

---

## `widgets`

Крупные самостоятельные блоки интерфейса.

Примеры:

```text
widgets/
├── Header/
├── Hero/
├── DashboardStats/
├── DeckList/
├── StudySession/
├── ProfileHeader/
└── DiscoveryCatalog/
```

Widget может объединять несколько entities и features.

---

## `features`

Пользовательские действия и бизнес-сценарии.

Примеры:

```text
features/
├── auth/
│   ├── login/
│   ├── register/
│   └── logout/
│
├── deck/
│   ├── createDeck/
│   ├── editDeck/
│   ├── deleteDeck/
│   └── saveDeck/
│
├── card/
│   ├── createCard/
│   ├── editCard/
│   └── deleteCard/
│
└── study/
    └── rateCard/
```

Feature отвечает на вопрос:

> Что пользователь может сделать?

Например:

```text
createDeck
login
register
deleteCard
rateCard
saveDeck
```

---

## `entities`

Бизнес-сущности приложения.

```text
entities/
├── user/
├── deck/
├── card/
└── study/
```

Например:

```text
entities/deck/
├── model/
│   ├── types.ts
│   └── selectors.ts
└── ui/
    └── DeckCard/
```

Entity отвечает на вопрос:

> С чем работает приложение?

Например:

```text
User
Deck
Card
StudyProgress
```

---

## `shared`

Переиспользуемый код, который не содержит бизнес-логики конкретного продукта.

```text
shared/
├── ui/
├── lib/
├── api/
├── config/
└── types/
```

Примеры:

```text
shared/ui/Button
shared/ui/Input
shared/ui/Modal
shared/ui/Loader
shared/lib/formatDate
shared/lib/validation
```

---

# 📂 Пример структуры проекта

```text
src/
│
├── app/
│   ├── providers/
│   │   ├── StoreProvider/
│   │   └── RouterProvider/
│   │
│   ├── router/
│   │   └── index.tsx
│   │
│   ├── store/
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── api/
│   │   └── api.ts
│   │
│   ├── styles/
│   │   ├── index.scss
│   │   └── variables.scss
│   │
│   └── App.tsx
│
├── pages/
│   ├── HomePage/
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── DashboardPage/
│   ├── ProfilePage/
│   ├── DeckPage/
│   ├── StudyPage/
│   └── DiscoveryPage/
│
├── widgets/
│   ├── Header/
│   ├── Hero/
│   ├── DashboardStats/
│   ├── DeckList/
│   ├── StudySession/
│   └── DiscoveryCatalog/
│
├── features/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── logout/
│   │
│   ├── deck/
│   │   ├── createDeck/
│   │   ├── editDeck/
│   │   ├── deleteDeck/
│   │   └── saveDeck/
│   │
│   ├── card/
│   │   ├── createCard/
│   │   ├── editCard/
│   │   └── deleteCard/
│   │
│   └── study/
│       └── rateCard/
│
├── entities/
│   ├── user/
│   ├── deck/
│   ├── card/
│   └── study/
│
└── shared/
    ├── ui/
    ├── lib/
    ├── api/
    ├── config/
    └── types/
```

---

# 🔄 Работа с API

Для работы с сервером используется **RTK Query**.

Общий API-клиент располагается в:

```text
app/api/
```

Например:

```text
app/api/api.ts
```

RTK Query отвечает за:

* запросы;
* mutations;
* cache;
* loading states;
* error states;
* invalidation;
* автоматическое обновление данных.

Пример API:

```text
GET    /auth/me

POST   /auth/login
POST   /auth/register
POST   /auth/logout

GET    /decks
GET    /decks/:id
POST   /decks
PATCH  /decks/:id
DELETE /decks/:id

GET    /decks/:id/cards
POST   /decks/:id/cards
PATCH  /cards/:id
DELETE /cards/:id

POST   /study/:cardId/rate

GET    /dashboard
GET    /users/:username
```

---

# 🧩 Разделение API

API не должен превращаться в один огромный файл.

Общие настройки RTK Query:

```text
app/api/api.ts
```

А endpoint'ы логически разделяются по сущностям:

```text
entities/
├── user/
│   └── api/
│
├── deck/
│   └── api/
│
├── card/
│   └── api/
│
└── study/
    └── api/
```

Например:

```text
deckApi
cardApi
userApi
studyApi
```

При этом все они могут использовать общий `baseApi`.

---

# 🗃 Redux

Redux используется для **глобального клиентского состояния**, а RTK Query — для серверного состояния.

### Redux

Подходит для:

* UI state;
* состояния модальных окон;
* глобальных настроек;
* theme;
* локального состояния приложения;
* других данных, которые действительно должны быть глобальными.

### RTK Query

Используется для:

* пользователей;
* наборов;
* карточек;
* статистики;
* результатов обучения;
* данных с API.

Не следует хранить полученные с сервера данные одновременно и в RTK Query, и в обычных Redux slices без необходимости.

---

# 🔐 Authentication

Авторизация должна быть построена вокруг текущего пользователя.

Пример:

```text
User
 ↓
Auth API
 ↓
RTK Query
 ↓
Auth state
 ↓
Protected Routes
```

Защищённые страницы:

```text
/dashboard
/profile
/decks
/decks/:id/study
```

Публичные страницы:

```text
/
/login
/register
/discovery
/decks/:id
```

Для действий, доступных только авторизованным пользователям, используется проверка авторизации.

Например:

```text
Создать набор
Добавить карточку
Сохранить набор
Начать обучение
Редактировать профиль
```

---

# 🧭 Routing

Основные маршруты:

```text
/
├── /login
├── /register
├── /dashboard
├── /profile/:username
├── /decks
├── /decks/:deckId
├── /decks/:deckId/study
├── /decks/:deckId/edit
└── /discovery
```

Защищённые маршруты должны быть вынесены в отдельный механизм `AuthGuard` / `ProtectedRoute`.

---

# 📝 Forms

Для сложных форм используется:

* React Hook Form
* Zod

Например, форма создания набора:

```text
CreateDeckForm
├── title
├── description
├── category
└── visibility
```

Форма карточки:

```text
CreateCardForm
├── question
└── answer
```

Форма регистрации:

```text
RegisterForm
├── username
├── email
├── password
└── confirmPassword
```

Валидация должна находиться рядом с feature/model:

```text
features/auth/register/
└── model/
    └── schema.ts
```

---

# 🎨 UI

Компоненты общего назначения находятся в:

```text
shared/ui/
```

Примеры:

```text
Button
Input
Textarea
Select
Modal
Avatar
Loader
Skeleton
Pagination
```

Компоненты не должны содержать бизнес-логику конкретной сущности.

Например:

```text
shared/ui/Button
```

не должен знать ничего о:

```text
Deck
User
Card
Study
```

---

# 📏 FSD Rules

Основные правила архитектуры:

### 1. Направление импортов

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

Слой не должен импортировать код из слоя выше.

---

### 2. Entities не знают о Features

❌ Нельзя:

```text
entities/deck
    ↓
features/createDeck
```

Entity должна оставаться независимой.

---

### 3. Shared не знает о бизнес-логике

❌ Нельзя:

```text
shared/ui/Button
    ↓
entities/deck
```

---

### 4. Pages собирают интерфейс

Page должна в основном композиционно объединять:

```text
widgets
features
entities
shared
```

а не превращаться в огромный компонент со всей бизнес-логикой.

---

# 🚀 MVP

Первая версия приложения должна включать:

```text
Authentication
      ↓
Profile
      ↓
Decks
      ↓
Cards
      ↓
Study
      ↓
Statistics
      ↓
Public sharing
```

### Этап 1 — Foundation

* Vite
* React
* TypeScript
* SCSS
* FSD
* React Router
* Redux Toolkit
* RTK Query
* ESLint
* Prettier

### Этап 2 — Authentication

* Login
* Register
* Logout
* Current user
* Protected routes

### Этап 3 — Decks

* Create
* Read
* Update
* Delete
* Public/private

### Этап 4 — Cards

* Create
* Read
* Update
* Delete

### Этап 5 — Study

* Просмотр карточек
* Переворот карточки
* Оценка знания
* Следующая карточка

### Этап 6 — Dashboard

* Statistics
* Progress
* Streak
* Accuracy
* Cards to review

### Этап 7 — Discovery

* Public decks
* Categories
* Search
* Save deck

---

# 🔮 Future Features

После MVP можно добавить:

* AI generation карточек;
* автоматическую генерацию наборов;
* likes;
* comments;
* ratings;
* recommendations;
* совместные study rooms;
* notifications;
* полноценный spaced repetition algorithm;
* mobile application.

---

# 📦 Installation

Клонировать репозиторий:

```bash
git clone <repository-url>
cd <project-directory>
```

Установить зависимости:

```bash
npm install
```

Запустить development server:

```bash
npm run dev
```

После запуска приложение будет доступно по адресу:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Создать файл:

```text
.env
```

Пример:

```env
VITE_API_URL=http://localhost:3000/api
```

Не добавлять `.env` с секретными значениями в Git.

---

# 📜 Scripts

```bash
npm run dev
```

Запуск development server.

```bash
npm run build
```

Production build.

```bash
npm run preview
```

Просмотр production build локально.

```bash
npm run lint
```

Проверка ESLint.

---

# 🎯 Product Goal

Главная идея продукта — сделать процесс обучения максимально простым:

```text
Создал набор
      ↓
Добавил карточки
      ↓
Начал изучать
      ↓
Оценил свои знания
      ↓
Система запомнила прогресс
      ↓
Вернулся позже
      ↓
Повторил нужные карточки
```

В результате пользователь должен каждый день понимать:

> **Что мне сегодня нужно выучить или повторить?**
