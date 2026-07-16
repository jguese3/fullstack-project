/**
 * Jarones All Movies Page Component
 */
import type { Movies } from '../../../types/movies';
import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay';
import './AllMovies.css';

export function AllMovies({
  movies,
  toggleWatchlist,
  error,
}: {
  movies: Movies[];
  toggleWatchlist: (movieId: number) => Promise<void> | void;
  error: string | null;
}) {
  return (
    <section className="all-movies">
      <header className="all-movies__header">
        <h1 className="all-movies__title">All Movies</h1>
      </header>
      <main className="all-movies__content">
        {error ? <p className="all-movies__error">{error}</p> : null}
        <MovieListDisplay movies={movies} onWatchlistClick={toggleWatchlist} />
      </main>
    </section>
  );
}
 