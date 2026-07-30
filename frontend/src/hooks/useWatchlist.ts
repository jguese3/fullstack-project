// useWatchlist — Sprint 5: all requests now include the Clerk token.
// Data is per-user — each user has their own watchlist in the database.
// useAuth() from Clerk provides getToken() to attach to every request.
// Invoked in: CataloguePage, WatchlistPage, Footer

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
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
  const { getToken, isSignedIn } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    getToken()
      .then((token) => watchlistRepo.getAll(token ?? ''))
      .then(setWatchlist)
      .catch((err) => console.error('[useWatchlist]', err))
      .finally(() => setLoading(false));
  }, [isSignedIn, getToken]);

  const toggleWatchlist = useCallback(async (movieId: number): Promise<void> => {
    const token = await getToken();
    if (!token) return;
    const updated = await watchlistRepo.toggle(movieId, token);
    if (updated) setWatchlist(updated);
  }, [getToken]);

  const toggleWatched = useCallback(async (movieId: number): Promise<void> => {
    const token = await getToken();
    if (!token) return;
    const updated = await watchlistRepo.toggleWatched(movieId, token);
    if (updated) setWatchlist(updated);
  }, [getToken]);

  const isInWatchlist = useCallback(
    (movieId: number): boolean => watchlist.some((e) => e.movieId === movieId),
    [watchlist]
  );

  return {
    watchlist, loading, toggleWatchlist, toggleWatched, isInWatchlist,
    count: watchlist.length,
    watchedCount: watchlist.filter((e) => e.watched).length,
  };
};

export default useWatchlist;
