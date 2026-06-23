// useWatchlist — presentation hook for watchlist state management.
//
// What it does:
//   Seeds watchlist state from watchlistRepo via watchlistService on mount.
//   Exposes toggle (add/remove) and toggleWatched actions.
//   Keeps local state in sync with the repository after each operation.
//   Provides a helper to check if a movie is in the watchlist.
//
// What it does NOT do:
//   Does not define business rules (e.g. movie must exist) — that is
//   watchlistService's concern.
//   Does not read or write data directly — that belongs to the repository.
//
// Invoked in: CataloguePage, WatchlistPage
// This satisfies T.1 (invoked in at least two components) and T.4 (replaces
// the prop-drilled watchlist state from Sprint 2's App.tsx).

import { useState, useCallback } from 'react';
import { WatchlistEntry } from '../types';
import watchlistService from '../services/watchlistService';

interface UseWatchlistResult {
  /** Current list of watchlist entries */
  watchlist: WatchlistEntry[];
  /** Toggles a movie in or out of the watchlist */
  toggleWatchlist: (movieId: number) => void;
  /** Toggles the watched/unwatched status of an entry */
  toggleWatched: (movieId: number) => void;
  /** Returns true if the given movieId is currently in the watchlist */
  isInWatchlist: (movieId: number) => boolean;
  /** Total number of entries in the watchlist */
  count: number;
  /** Number of entries marked as watched */
  watchedCount: number;
}

const useWatchlist = (): UseWatchlistResult => {
  // Seed state from the service (which reads from the repo)
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>(
    () => watchlistService.getAll()
  );

  const toggleWatchlist = useCallback((movieId: number): void => {
    const result = watchlistService.toggle(movieId);
    if (result.success) setWatchlist(result.entries);
  }, []);

  const toggleWatched = useCallback((movieId: number): void => {
    const result = watchlistService.toggleWatched(movieId);
    if (result.success) setWatchlist(result.entries);
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number): boolean =>
      watchlist.some((e) => e.movieId === movieId),
    [watchlist]
  );

  return {
    watchlist,
    toggleWatchlist,
    toggleWatched,
    isInWatchlist,
    count: watchlist.length,
    watchedCount: watchlist.filter((e) => e.watched).length,
  };
};

export default useWatchlist;
