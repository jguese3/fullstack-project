// watchlistRepo — sole manager of WatchlistEntry data on the front-end.
// Sprint 4 refactor: now fetches from the real back-end instead of
// holding an in-memory array. Data now persists across page reloads
// because it lives in the SQLite database.

import { WatchlistEntry } from '../types';
import { API_BASE } from '../apiBase';

const watchlistRepo = {
  async getAll(): Promise<WatchlistEntry[]> {
    const res = await fetch(`${API_BASE}/watchlist`);
    if (!res.ok) throw new Error('Failed to fetch watchlist.');
    return res.json();
  },

  async toggle(movieId: number): Promise<WatchlistEntry[] | null> {
    const res = await fetch(`${API_BASE}/watchlist/${movieId}/toggle`, { method: 'POST' });
    if (!res.ok) return null;
    return res.json();
  },

  async toggleWatched(movieId: number): Promise<WatchlistEntry[] | null> {
    const res = await fetch(`${API_BASE}/watchlist/${movieId}/toggle-watched`, { method: 'POST' });
    if (!res.ok) return null;
    return res.json();
  },
};

export default watchlistRepo;
