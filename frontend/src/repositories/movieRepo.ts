// movieRepo — sole manager of Movie data on the front-end.
// Sprint 4 refactor: now fetches from the real back-end instead of
// holding an in-memory array.

import { Movie } from '../types';
import { API_BASE } from '../apiBase';

const movieRepo = {
  async getAll(): Promise<Movie[]> {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies.');
    return res.json();
  },
};

export default movieRepo;
