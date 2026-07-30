// watchlistService — Sprint 5: all operations scoped to a specific userId.

import watchlistRepo, { WatchlistEntryWithMovie } from '../repositories/watchlistRepo';
import movieService from './movieService';

export interface WatchlistResult {
  success: boolean;
  entries?: WatchlistEntryWithMovie[];
  error?: string;
}

const watchlistService = {
  async getAllForUser(userId: number): Promise<WatchlistEntryWithMovie[]> {
    return watchlistRepo.getAllForUser(userId);
  },

  async toggle(movieId: number, userId: number): Promise<WatchlistResult> {
    const existing = await watchlistRepo.findByMovieAndUser(movieId, userId);

    if (existing) {
      await watchlistRepo.remove(movieId, userId);
      return { success: true, entries: await watchlistRepo.getAllForUser(userId) };
    }

    const movieExists = await movieService.exists(movieId);
    if (!movieExists) {
      return { success: false, error: `Movie with id ${movieId} does not exist.` };
    }

    await watchlistRepo.add(movieId, userId);
    return { success: true, entries: await watchlistRepo.getAllForUser(userId) };
  },

  async toggleWatched(movieId: number, userId: number): Promise<WatchlistResult> {
    const existing = await watchlistRepo.findByMovieAndUser(movieId, userId);
    if (!existing) {
      return { success: false, error: 'Movie is not in your watchlist.' };
    }

    await watchlistRepo.toggleWatched(movieId, userId, !existing.watched);
    return { success: true, entries: await watchlistRepo.getAllForUser(userId) };
  },
};

export default watchlistService;
