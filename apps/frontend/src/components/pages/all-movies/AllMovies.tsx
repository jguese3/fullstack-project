/**
 * Jarones All Movies Page Component
 */
import type { Movie } from '../../../types/movies';
import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay';
// @ts-ignore
import './AllMovies.css';

export function AllMovies({
  movies,
  toggleWatchlist,
  error,
}: {
  movies: Movie[];
  toggleWatchlist: (movieId: number) => Promise<void> | void;
  error: string | null;
}) {
  return (
    <>
      <header>
        <h1>All Movies</h1>
      </header>
      <main>
        {error ? <p className="all-movies__error">{error}</p> : null}
        <MovieListDisplay movies={movies} onWatchlistClick={toggleWatchlist} />
      </main>
    </>
  );
}
 