import { useMovies } from '../../../hooks/useMovies';
import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay';
import './AllMovies.css';

export function AllMovies() {
  const { movies, toggleWatchlist, error } = useMovies([], null);

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