// Central type definitions for CineLog front-end.
// These mirror the shapes returned by the back-end's Prisma-backed API.

export type Genre =
  | 'Action' | 'Comedy' | 'Drama' | 'Horror' | 'Sci-Fi'
  | 'Thriller' | 'Romance' | 'Animation' | 'Documentary' | 'Fantasy';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;   // Prisma stores genre as a plain string column
  director: string;
  rating: number;
  description: string;
  poster: string;
}

// Matches the back-end's WatchlistEntryWithMovie shape — includes the
// related Movie object so the front-end doesn't need a second request.
export interface WatchlistEntry {
  id: number;
  movieId: number;
  addedAt: string;
  watched: boolean;
  movie: Movie;
}

export interface Review {
  id: number;
  movieId: number;
  text: string;
  rating: number;
  createdAt: string;
}
