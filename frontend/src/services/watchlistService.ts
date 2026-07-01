// watchlistService — Sprint 4: this layer is now a thin pass-through to
// watchlistRepo since all business logic (movie existence check, toggle
// logic) is enforced on the back-end. The front-end service still exists
// to maintain the Hook → Service → Repository separation.

import { WatchlistEntry } from '../types';
import watchlistRepo from '../repositories/watchlistRepo';

const watchlistService = {
  async getAll(): Promise<WatchlistEntry[]> {
    return watchlistRepo.getAll();
  },

  async toggle(movieId: number): Promise<WatchlistEntry[] | null> {
    return watchlistRepo.toggle(movieId);
  },

  async toggleWatched(movieId: number): Promise<WatchlistEntry[] | null> {
    return watchlistRepo.toggleWatched(movieId);
  },
};

export default watchlistService;
