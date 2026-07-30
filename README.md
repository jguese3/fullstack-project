# MovieFlex — Sprint 5 (Full-Stack + Clerk Auth)

### Project Summary
```bash
MovieFlex is a full-stack movie catalogue application built with React, TypeScript, Express, Prisma, and SQLite. Users can browse movies, maintain a personal watchlist, and write reviews. Authentication is handled by Clerk — watchlists and reviews are per-user and persist across sessions.
```
---
## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd movieflex-sprint5
npm install
```

### 2. Environment variables

**backend/.env**
```
DATABASE_URL="file:./dev.db"
FRONTEND_ORIGIN="http://localhost:5173"
PORT=3001
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

**frontend/.env**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

### 3. Database setup

```bash
cd backend
npx prisma migrate dev --name add-user-table
npx prisma migrate dev --name add-user-to-watchlist-and-reviews
# Seeds 12 movies automatically on first migrate
```

### 4. Run locally (two terminals)

```bash
# Terminal 1 — backend (http://localhost:3001)
cd backend && npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend && npm run dev
```

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | Public | Health check |
| GET | `/api/movies` | Public | All movies |
| GET | `/api/watchlist` | Required | User's watchlist |
| POST | `/api/watchlist/:movieId/toggle` | Required | Add/remove from watchlist |
| POST | `/api/watchlist/:movieId/toggle-watched` | Required | Toggle watched status |
| GET | `/api/reviews` | Required | User's reviews |
| POST | `/api/reviews` | Required | Create a review |
| DELETE | `/api/reviews/:id` | Required | Delete own review |

---

## Database Schema (3NF)

```
User           — id, clerkId (unique), email, displayName, createdAt
Movie          — id, title, year, genre, director, rating, description, poster
WatchlistEntry — id, userId (FK), movieId (FK), addedAt, watched
               — @@unique([userId, movieId])
Review         — id, userId (FK), movieId (FK), text, rating, createdAt
```
---


