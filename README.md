 

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


