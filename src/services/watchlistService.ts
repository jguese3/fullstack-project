// watchlistService — business logic for Watchlist operations.
//
// What it does:
//   Validates that a movie exists before adding it to the watchlist.
//   Decides toggle behaviour (add vs remove) based on current state.
//   Delegates all data reads/writes to watchlistRepo.
//
// What it does NOT do:
//   Does not hold or mutate data directly — that belongs to watchlistRepo.
//   Does not manage React state — that belongs to useWatchlist hook.
//
// Used by: useWatchlist (invoked in CataloguePage and WatchlistPage)

import { WatchlistEntry } from '../types';
import watchlistRepo from '../repositories/watchlistRepo';
import movieService from './movieService';

export interface WatchlistResult {
  success: boolean;
  entries: WatchlistEntry[];
  error?: string;
}

const watchlistService = {
  /** Returns all current watchlist entries */
  getAll(): WatchlistEntry[] {
    return watchlistRepo.getAll();
  },

  /**
   * Toggles a movie in/out of the watchlist.
   * Validates that the movie exists before adding.
   * Returns the updated entries list.
   */
  toggle(movieId: number): WatchlistResult {
    const current = watchlistRepo.getAll();
    const alreadyAdded = current.some((e) => e.movieId === movieId);

    if (alreadyAdded) {
      watchlistRepo.remove(movieId);
      return { success: true, entries: watchlistRepo.getAll() };
    }

    // Validate movie exists before adding
    if (!movieService.exists(movieId)) {
      return {
        success: false,
        entries: current,
        error: `Movie with id ${movieId} does not exist.`,
      };
    }

    watchlistRepo.add(movieId);
    return { success: true, entries: watchlistRepo.getAll() };
  },

  /**
   * Toggles the watched status of an entry.
   * Returns the updated entries list.
   */
  toggleWatched(movieId: number): WatchlistResult {
    const result = watchlistRepo.toggleWatched(movieId);
    if (!result) {
      return {
        success: false,
        entries: watchlistRepo.getAll(),
        error: `Movie with id ${movieId} is not in the watchlist.`,
      };
    }
    return { success: true, entries: watchlistRepo.getAll() };
  },
};

export default watchlistService;
