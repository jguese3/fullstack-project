/**
 * WatchlistPage — /watchlist
 *
 * Architecture usage (satisfies I.3):
 *
 * HOOK (useWatchlist):
 *   Called here to read watchlist entries and call toggleWatchlist /
 *   toggleWatched. Because useWatchlist and the underlying watchlistRepo
 *   are module-level singletons, the same in-memory store is shared with
 *   CataloguePage — changes made there are immediately reflected here.
 *   This replaces the shared state prop-drilling from Sprint 2 (T.4).
 *
 * SERVICE (via useWatchlist → watchlistService):
 *   Business rules (e.g. movie must exist before adding) are enforced by
 *   watchlistService. This page never validates anything itself.
 *
 * REPOSITORY (via useWatchlist → watchlistService → watchlistRepo):
 *   All reads and writes go through watchlistRepo. This page never
 *   touches data storage directly.
 */

import { Movie } from '../types';
import movieService from '../services/movieService';
import useWatchlist from '../hooks/useWatchlist';
import MovieCard from '../components/MovieCard';

const WatchlistPage = () => {
  const { watchlist, toggleWatchlist, toggleWatched, count, watchedCount } = useWatchlist();

  const getMovie = (movieId: number): Movie | undefined =>
    movieService.getById(movieId);

  const unwatched = watchlist.filter((e) => !e.watched);
  const watched   = watchlist.filter((e) => e.watched);

  return (
    <main className="page-main">
      <div className="page-header">
        <h2 className="page-title">My Watchlist</h2>
        <p className="page-subtitle">
          {count} total &nbsp;·&nbsp; {watchedCount} watched &nbsp;·&nbsp; {count - watchedCount} to watch
        </p>
      </div>

      {count === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <p>Your watchlist is empty. Head to the Catalogue to add movies!</p>
        </div>
      ) : (
        <>
          {unwatched.length > 0 && (
            <section className="watchlist-section">
              <h3 className="watchlist-section-title">🎬 To Watch ({unwatched.length})</h3>
              <div className="movie-grid">
                {unwatched.map((entry) => {
                  const movie = getMovie(entry.movieId);
                  if (!movie) return null;
                  return (
                    <div key={movie.id} className="watchlist-movie-wrap">
                      <MovieCard
                        movie={movie}
                        isInWatchlist={true}
                        onToggleWatchlist={toggleWatchlist}
                      />
                      <button
                        className="watched-btn"
                        onClick={() => toggleWatched(movie.id)}
                      >
                        ✓ Mark as Watched
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {watched.length > 0 && (
            <section className="watchlist-section">
              <h3 className="watchlist-section-title">✅ Watched ({watched.length})</h3>
              <div className="movie-grid movie-grid--watched">
                {watched.map((entry) => {
                  const movie = getMovie(entry.movieId);
                  if (!movie) return null;
                  return (
                    <div key={movie.id} className="watchlist-movie-wrap">
                      <MovieCard
                        movie={movie}
                        isInWatchlist={true}
                        onToggleWatchlist={toggleWatchlist}
                      />
                      <button
                        className="watched-btn watched-btn--undo"
                        onClick={() => toggleWatched(movie.id)}
                      >
                        ↩ Mark as Unwatched
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default WatchlistPage;
