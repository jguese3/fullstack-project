// watchlistService — Sprint 5: thin pass-through; token handled by useWatchlist hook.
import { WatchlistEntry } from '../types';
import watchlistRepo from '../repositories/watchlistRepo';

const watchlistService = {
  async getAll(token: string): Promise<WatchlistEntry[]> {
    return watchlistRepo.getAll(token);
  },
  async toggle(movieId: number, token: string): Promise<WatchlistEntry[] | null> {
    return watchlistRepo.toggle(movieId, token);
  },
  async toggleWatched(movieId: number, token: string): Promise<WatchlistEntry[] | null> {
    return watchlistRepo.toggleWatched(movieId, token);
  },
};

export default watchlistService;
