# Jarone Sprint 3 Architectural Layout Document 

## AllMoviesRepository

1. What does it do?

    It handles reading and writing movie data. Functions include: get all movies, get movie by id, and add/remove or toggle a movie in the watchlist.

2. Why is this separated?

    The repository only talks to data (mock files, localStorage, or an API). It keeps data logic in one place so other code does not need to know how data is stored.

3. Where is it used?

    File: `src/assets/apis/allMoviesRepo.ts`.

    - Used by the service to load and save movies.
    - Can be used directly in tests or scripts that need raw data access.

---

## AllMoviesService

1. What does it do?

    The service applies simple business rules on top of the repository. It offers helpful functions like: get formatted lists, search/filter, and toggle watchlist while returning the updated movie.

2. Why is this separated?

    The service keeps business rules out of the repository and UI. This makes rules easy to change and test without touching storage or component code.

3. Where is it used?

    File: `src/services/allMoviesService.ts`.

    - Used by hooks and components to get ready-to-use movie data and to change watchlist state.

---

## `useMovie` hook

1. What does it do?

    The hook provides state and actions for components: movie lists, a selected movie, loading/error flags, and functions like `refresh` and `toggleWatchlist`.

2. Why is this separated?

    The hook uses the service for data work so it only needs to handle UI state and when to update it.

3. Where is it used?

    File: `src/hooks/useMovies.ts`.

    - Used by UI components such as `src/components/all-movies/AllMovies.tsx`, `src/components/movie-list-display/MovieListDisplay.tsx`, and `src/components/my-movies/MyMovies.tsx`.

