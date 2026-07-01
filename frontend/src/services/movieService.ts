// movieService — business logic for Movie operations.
// Sprint 4 refactor: all methods are now async since movieRepo fetches
// from the network. Filtering logic is unchanged (still pure, still
// runs entirely client-side on the already-fetched list).

import { Movie, Genre } from '../types';
import movieRepo from '../repositories/movieRepo';

export interface MovieFilter {
  query?: string;
  genre?: Genre | '' | string;
}

const movieService = {
  async getAll(): Promise<Movie[]> {
    return movieRepo.getAll();
  },

  filter(movies: Movie[], { query = '', genre = '' }: MovieFilter): Movie[] {
    const q = query.toLowerCase().trim();
    return movies.filter((movie) => {
      const matchesQuery =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        movie.director.toLowerCase().includes(q);
      const matchesGenre = !genre || movie.genre === genre;
      return matchesQuery && matchesGenre;
    });
  },
};

export default movieService;
