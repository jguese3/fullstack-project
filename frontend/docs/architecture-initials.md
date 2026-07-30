# CineLog — Sprint 3 Architecture Document

> Replace `initials` in the filename with your own initials before submitting.

---

## Overview

Sprint 3 refactors the CineLog front-end to follow a three-layer **Hook → Service → Repository** architecture. The goal is to give each layer a single, clear responsibility:

| Layer | Responsibility |
|---|---|
| **Repository** | Read and write in-memory data. Sole owner of each data type. |
| **Service** | Apply business rules before delegating to a repository. |
| **Hook** | Manage React state and expose actions to components. |

Components never call repositories directly and never define business rules.

---

## Repositories

### `movieRepo`

**What it does:**
Holds the in-memory array of `Movie` objects, seeded once from `src/data/movies.ts`. Provides `getAll()`, `getById()`, `create()`, `update()`, and `delete()` methods. It is the only file in the application that imports the raw movies test data.

**How concerns were separated:**
Any logic that decides *which* movies to return (filtering, sorting) or *whether* a movie is valid belongs to the service layer. `movieRepo` only provides raw CRUD access. Keeping it free of rules means it can be swapped for a real API call in the next sprint without touching any service or hook.

**Where it is used:**
Called exclusively by `movieService`. No component or hook imports `movieRepo` directly.

---

### `watchlistRepo`

**What it does:**
Holds the in-memory `WatchlistEntry[]` store. Provides `getAll()`, `add()`, `remove()`, and `toggleWatched()`. The store starts empty and is modified at runtime by user interactions.

**How concerns were separated:**
`watchlistRepo` does not know what a "valid" movie is — it simply adds an entry for any movieId it receives. The rule that a movie must exist before being added belongs to `watchlistService`. This separation means the repo can be replaced with a `fetch()` call later without any service changes.

**Where it is used:**
Called exclusively by `watchlistService`, which is called by the `useWatchlist` hook, which is used in `CataloguePage`, `WatchlistPage`, and `Footer`.

---

### `reviewRepo`

**What it does:**
Holds the in-memory `Review[]` store. Provides `getAll()`, `getByMovieId()`, `create()`, and `delete()`. New reviews are prepended to the store so the most recent appear first.

**How concerns were separated:**
`reviewRepo` does not validate review text length, rating ranges, or movie existence — all of that is `reviewService`'s concern. The repo only stores and retrieves data.

**Where it is used:**
Called exclusively by `reviewService`, which is called by the `useReviews` hook, which is used in `ReviewsPage`.

---

## Services

### `movieService`

**What it does:**
Provides `getAll()`, `getById()`, `exists()`, and `filter()`. The `filter()` method applies the text-search and genre-matching rules that determine which movies match a user's query.

**How concerns were separated:**
Filtering logic (what "match" means) is a business rule, not a presentation concern. Moving it here means the hook (`useSearch`) only manages *which filters the user has selected*, not *what filtering does*. It also means `watchlistService` and `reviewService` can call `movieService.exists()` to validate a movieId without duplicating that check.

**Where it is used:**
- `useSearch` calls `movieService.filter()` to compute the filtered list.
- `watchlistService` and `reviewService` call `movieService.exists()` to validate a movieId before adding to the watchlist or creating a review.
- `CataloguePage`, `WatchlistPage`, and `ReviewsPage` call `movieService.getAll()` / `getById()` directly for display purposes (read-only, no business logic needed).

---

### `watchlistService`

**What it does:**
Implements the two watchlist business rules: a movie must exist before being added (`toggle`), and toggling a movie that is already in the list removes it rather than duplicating it. Delegates all data writes to `watchlistRepo` and returns the updated entries list on every operation.

**How concerns were separated:**
The "add vs remove" toggle decision is a business rule that belongs here, not in the hook or the component. The hook (`useWatchlist`) only manages state updates in response to service results — it never decides what the correct action is.

**Where it is used:**
Called by `useWatchlist`, which is invoked in `CataloguePage`, `WatchlistPage`, and `Footer`.

---

### `reviewService`

**What it does:**
Validates all three business rules for creating a review: the selected movie must exist, the review text must be between 10 and 300 characters, and the rating must be between 1 and 10. On success, delegates creation to `reviewRepo`. Also provides a `delete()` passthrough.

**How concerns were separated:**
Validation rules (minimum/maximum length, valid rating range) are business concerns that belong here rather than in the component or hook. This means `ReviewsPage` never contains an `if (text.length < 10)` check — it calls `createReview()` and responds to the success/failure result. If the rules change, only this service needs to be updated.

**Where it is used:**
Called by `useReviews`, which is invoked in `ReviewsPage`.

---

## Hooks

### `useWatchlist`

**What it does:**
Seeds local React state from `watchlistService.getAll()` on mount. Exposes `toggleWatchlist`, `toggleWatched`, `isInWatchlist`, `count`, and `watchedCount`. After each service call, updates state with the returned entries list to keep the UI in sync with the repository.

**How concerns were separated:**
The hook manages *when and how to update React state* — nothing more. It does not define business rules or touch data storage. This is the correct layer for state because React's re-render cycle is a presentation concern.

**Where it is used:**
- `CataloguePage` — uses `isInWatchlist` and `toggleWatchlist` to show/update the Add/Remove button on each `MovieCard`.
- `WatchlistPage` — uses `watchlist`, `toggleWatchlist`, `toggleWatched`, `count`, and `watchedCount` to render and manage the list.
- `Footer` — uses `count` to display the live watchlist size without needing a prop from `App`.

This satisfies **T.1** (invoked in at least two components) and **T.4** (replaces Sprint 2's prop-drilled shared state).

---

### `useSearch`

**What it does:**
Manages `query` and `selectedGenre` in local state. Passes those values to `movieService.filter()` inside a `useMemo` to compute the filtered list only when inputs change. Returns the filtered list alongside the current values and setters.

**How concerns were separated:**
What filter values the user has chosen is a presentation concern (state). What "matching a filter" means is a business concern (`movieService`). The hook owns the first; the service owns the second. This was refactored from Sprint 2 where the filtering logic lived inline inside the hook.

**Where it is used:**
`CataloguePage` — powers the `SearchBar` component.

---

### `useReviews`

**What it does:**
Seeds local React state from `reviewService.getAll()` on mount. Exposes `createReview`, `deleteReview`, `error`, and `clearError`. `createReview` returns a boolean indicating success so the component knows whether to reset its form inputs.

**How concerns were separated:**
The hook knows *when to show an error* (presentation) but not *what makes a review invalid* (business logic in `reviewService`). Error messages come from the service and are stored in state by the hook — the component just renders them.

**Where it is used:**
`ReviewsPage` — manages the full review lifecycle (form submission, list display, deletion).
