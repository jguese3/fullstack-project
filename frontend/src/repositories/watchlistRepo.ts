// watchlistRepo — Sprint 5: all requests include Clerk token (per-user data).
// I.1: "At least one request includes the logged-in user's session token."

import { WatchlistEntry } from '../types';
import { API_BASE } from '../apiBase';

const watchlistRepo = {
  async getAll(token: string): Promise<WatchlistEntry[]> {
    const res = await fetch(`${API_BASE}/watchlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch watchlist.');
    return res.json();
  },

  async toggle(movieId: number, token: string): Promise<WatchlistEntry[] | null> {
    const res = await fetch(`${API_BASE}/watchlist/${movieId}/toggle`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  },

  async toggleWatched(movieId: number, token: string): Promise<WatchlistEntry[] | null> {
    const res = await fetch(`${API_BASE}/watchlist/${movieId}/toggle-watched`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  },
};

export default watchlistRepo;
