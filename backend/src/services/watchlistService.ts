// watchlistService — business logic for Watchlist operations.
//
// What it does:
//   - Validates the movie exists before adding it to the watchlist
//   - Decides toggle behaviour (add vs remove) based on current state
//   - Validates a watchlist entry exists before toggling its watched status
//
// What it does NOT do:
//   Does not touch Prisma directly — that belongs to watchlistRepo.
//   Does not handle HTTP — that belongs to the controller.

import watchlistRepo, { WatchlistEntryWithMovie } from '../repositories/watchlistRepo';
import movieService from './movieService';

export interface WatchlistResult {
  success: boolean;
  entries?: WatchlistEntryWithMovie[];
  error?: string;
}

const watchlistService = {
  async getAll(): Promise<WatchlistEntryWithMovie[]> {
    return watchlistRepo.getAll();
  },

  async toggle(movieId: number): Promise<WatchlistResult> {
    const existing = await watchlistRepo.findByMovieId(movieId);

    if (existing) {
      await watchlistRepo.remove(movieId);
      return { success: true, entries: await watchlistRepo.getAll() };
    }

    const movieExists = await movieService.exists(movieId);
    if (!movieExists) {
      return { success: false, error: `Movie with id ${movieId} does not exist.` };
    }

    await watchlistRepo.add(movieId);
    return { success: true, entries: await watchlistRepo.getAll() };
  },

  async toggleWatched(movieId: number): Promise<WatchlistResult> {
    const existing = await watchlistRepo.findByMovieId(movieId);

    if (!existing) {
      return { success: false, error: `Movie with id ${movieId} is not in the watchlist.` };
    }

    await watchlistRepo.toggleWatched(movieId, !existing.watched);
    return { success: true, entries: await watchlistRepo.getAll() };
  },
};

export default watchlistService;
