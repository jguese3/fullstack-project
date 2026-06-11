// movieRepo — sole manager of Movie data.
//
// What it does:
//   Holds the in-memory movie store seeded from test data.
//   Provides CRUD methods: getAll, getById, create, update, delete.
//
// What it does NOT do:
//   It does not filter, validate, or sort — that is business logic (service layer).
//   Nothing outside this file imports the raw movies test data array.
//
// Used by: movieService

import { Movie } from '../types';
import moviesData from '../data/movies';

let store: Movie[] = moviesData.map((m) => ({ ...m }));

const movieRepo = {
  /** Returns a shallow copy of all movies */
  getAll(): Movie[] {
    return store.map((m) => ({ ...m }));
  },

  /** Returns a single movie by id, or undefined if not found */
  getById(id: number): Movie | undefined {
    return store.find((m) => m.id === id);
  },

  /** Adds a new movie to the store and returns the created movie */
  create(movie: Omit<Movie, 'id'>): Movie {
    const newMovie: Movie = { ...movie, id: Date.now() };
    store = [...store, newMovie];
    return { ...newMovie };
  },

  /** Updates an existing movie; returns updated movie or null if not found */
  update(id: number, changes: Partial<Omit<Movie, 'id'>>): Movie | null {
    const index = store.findIndex((m) => m.id === id);
    if (index === -1) return null;
    store = store.map((m) => (m.id === id ? { ...m, ...changes } : m));
    return { ...store[index], ...changes };
  },

  /** Removes a movie by id; returns true if removed, false if not found */
  delete(id: number): boolean {
    const exists = store.some((m) => m.id === id);
    if (!exists) return false;
    store = store.filter((m) => m.id !== id);
    return true;
  },
};

export default movieRepo;
