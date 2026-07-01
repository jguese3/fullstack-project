// useWatchlist — presentation hook for watchlist state management.
// Sprint 4 refactor: seeds state asynchronously from the back-end via
// watchlistRepo, and every action now awaits a network round trip.
// Data now persists across page reloads and browser sessions.
//
// Invoked in: CataloguePage, WatchlistPage, Footer

import { useState, useEffect, useCallback } from 'react';
import { WatchlistEntry } from '../types';
import watchlistRepo from '../repositories/watchlistRepo';

interface UseWatchlistResult {
  watchlist: WatchlistEntry[];
  loading: boolean;
  toggleWatchlist: (movieId: number) => Promise<void>;
  toggleWatched: (movieId: number) => Promise<void>;
  isInWatchlist: (movieId: number) => boolean;
  count: number;
  watchedCount: number;
}

const useWatchlist = (): UseWatchlistResult => {
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    watchlistRepo
      .getAll()
      .then(setWatchlist)
      .catch((err) => console.error('[useWatchlist] Failed to load:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleWatchlist = useCallback(async (movieId: number): Promise<void> => {
    const updated = await watchlistRepo.toggle(movieId);
    if (updated) setWatchlist(updated);
  }, []);

  const toggleWatched = useCallback(async (movieId: number): Promise<void> => {
    const updated = await watchlistRepo.toggleWatched(movieId);
    if (updated) setWatchlist(updated);
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number): boolean => watchlist.some((e) => e.movieId === movieId),
    [watchlist]
  );

  return {
    watchlist,
    loading,
    toggleWatchlist,
    toggleWatched,
    isInWatchlist,
    count: watchlist.length,
    watchedCount: watchlist.filter((e) => e.watched).length,
  };
};

export default useWatchlist;
