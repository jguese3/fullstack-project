// watchlistRepo — sole manager of WatchlistEntry data.
//
// What it does:
//   Holds the in-memory watchlist store.
//   Provides CRUD methods: getAll, add, remove, toggleWatched.
//
// What it does NOT do:
//   Does not validate whether a movieId exists — that is the service's concern.
//   Does not manage any UI state or presentation logic.
//
// Used by: watchlistService

import { WatchlistEntry } from '../types';

let store: WatchlistEntry[] = [];

const watchlistRepo = {
  /** Returns a copy of all watchlist entries */
  getAll(): WatchlistEntry[] {
    return store.map((e) => ({ ...e }));
  },

  /** Adds a new entry; returns the created entry */
  add(movieId: number): WatchlistEntry {
    const entry: WatchlistEntry = {
      movieId,
      addedAt: new Date().toISOString(),
      watched: false,
    };
    store = [...store, entry];
    return { ...entry };
  },

  /** Removes entry by movieId; returns true if removed */
  remove(movieId: number): boolean {
    const exists = store.some((e) => e.movieId === movieId);
    if (!exists) return false;
    store = store.filter((e) => e.movieId !== movieId);
    return true;
  },

  /** Flips the watched flag for an entry; returns updated entry or null */
  toggleWatched(movieId: number): WatchlistEntry | null {
    const index = store.findIndex((e) => e.movieId === movieId);
    if (index === -1) return null;
    store = store.map((e) =>
      e.movieId === movieId ? { ...e, watched: !e.watched } : e
    );
    return { ...store.find((e) => e.movieId === movieId)! };
  },
};

export default watchlistRepo;
