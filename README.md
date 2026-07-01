# CineLog — Sprint 4 (Full-Stack Monorepo)

## Structure

```
cinelog-sprint4/
├── package.json          <- root npm workspaces config
├── frontend/             <- React + Vite + TypeScript
└── backend/              <- Express + TypeScript + Prisma + SQLite
    ├── prisma/
    │   ├── schema.prisma <- database schema (Movie, WatchlistEntry, Review)
    │   └── seed.ts       <- seeds the DB with 12 initial movies
    └── src/
        ├── middleware/   <- validate.ts (request validation)
        ├── repositories/ <- Prisma CRUD
        ├── services/     <- business logic
        ├── controllers/  <- parse req/res
        └── routes/       <- URL → controller mapping
```

## First-time setup (do this once)

### 1. Install all dependencies from the monorepo root

```bash
cd cinelog-sprint4
npm install
```

### 2. Set up the database

```bash
cd backend
npx prisma migrate dev --name init
```

This creates `prisma/dev.db` (SQLite file) and automatically seeds it with 12 movies.

### 3. Generate the Prisma client (if not done automatically)

```bash
npx prisma generate
```

## Running locally

You need **two terminals** — one per app.

### Terminal 1 — backend

```bash
cd backend
npm run dev
```

Server starts at `http://localhost:3001`.
Verify: `http://localhost:3001/api/movies` should return 12 movies as JSON.

### Terminal 2 — frontend

```bash
cd frontend
npm run dev
```

App starts at `http://localhost:5173`.

## Running in GitHub Codespaces

Everything works the same way — the frontend automatically detects the
Codespaces `*.app.github.dev` hostname and rewrites API calls to the
forwarded port-3001 URL. Just make sure both `npm run dev` processes are
running simultaneously in two separate terminal tabs.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/movies` | All movies |
| GET | `/api/watchlist` | All watchlist entries (includes movie data) |
| POST | `/api/watchlist/:movieId/toggle` | Add or remove a movie from watchlist |
| POST | `/api/watchlist/:movieId/toggle-watched` | Toggle watched status |
| GET | `/api/reviews` | All reviews |
| POST | `/api/reviews` | Create a review |
| DELETE | `/api/reviews/:id` | Delete a review |

## Database schema (3NF)

```
Movie            — id, title, year, genre, director, rating, description, poster
WatchlistEntry   — id, movieId (FK → Movie), addedAt, watched
Review           — id, movieId (FK → Movie), text, rating, createdAt
```

Each table is in Third Normal Form: every non-key column depends only on
the primary key of that table. Movie data is never duplicated in
WatchlistEntry or Review — only the foreign key `movieId` is stored.
