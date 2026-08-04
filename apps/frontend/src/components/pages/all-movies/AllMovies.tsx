/**
 * Jarones All Movies Page Component
 */
import { useAuth } from '@clerk/clerk-react';
import type { Movies } from '../../../types/movies';
import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay';
import './AllMovies.css';

export function AllMovies({
  movies,
  toggleWatchlist,
  error,
  isSignedIn,
}: {
  movies: Movies[];
  toggleWatchlist: (movieId: number) => Promise<void> | void;
  error: string | null;
  isSignedIn: boolean;
}) {
  const { userId } = useAuth();

  return (
    <section className="all-movies">
      <header className="all-movies__header">
        <h1 className="all-movies__title">All Movies</h1>
        {isSignedIn && userId ? (
          <p className="all-movies__subtitle">Signed in as {userId}</p>
        ) : (
          <p className="all-movies__subtitle">Sign in to unlock watchlist controls.</p>
        )}
      </header>
      <main className="all-movies__content">
        {error ? <p className="all-movies__error">{error}</p> : null}
        <MovieListDisplay movies={movies} onWatchlistClick={toggleWatchlist} isSignedIn={isSignedIn} />
      </main>
    </section>
  );
}
 