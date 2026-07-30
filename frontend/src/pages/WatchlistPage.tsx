// WatchlistPage — /watchlist
// Sprint 5: requires auth. Shows LoginPrompt when signed out.
// Signed-in users see their own personal watchlist from the database.

import { SignedIn, SignedOut } from '@clerk/clerk-react';
import useWatchlist from '../hooks/useWatchlist';
import MovieCard from '../components/MovieCard';
import LoginPrompt from '../components/LoginPrompt';

const WatchlistContent = () => {
  const { watchlist, loading, toggleWatchlist, toggleWatched, count, watchedCount } = useWatchlist();

  const unwatched = watchlist.filter((e) => !e.watched);
  const watched   = watchlist.filter((e) => e.watched);

  if (loading) return <main className="page-main"><p className="loading-text">📋 Loading your watchlist…</p></main>;

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
                {unwatched.map((entry) => (
                  <div key={entry.movieId} className="watchlist-movie-wrap">
                    <MovieCard movie={entry.movie} isInWatchlist={true} onToggleWatchlist={toggleWatchlist} />
                    <button className="watched-btn" onClick={() => toggleWatched(entry.movieId)}>
                      ✓ Mark as Watched
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {watched.length > 0 && (
            <section className="watchlist-section">
              <h3 className="watchlist-section-title">✅ Watched ({watched.length})</h3>
              <div className="movie-grid movie-grid--watched">
                {watched.map((entry) => (
                  <div key={entry.movieId} className="watchlist-movie-wrap">
                    <MovieCard movie={entry.movie} isInWatchlist={true} onToggleWatchlist={toggleWatchlist} />
                    <button className="watched-btn watched-btn--undo" onClick={() => toggleWatched(entry.movieId)}>
                      ↩ Mark as Unwatched
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

const WatchlistPage = () => (
  <>
    <SignedIn><WatchlistContent /></SignedIn>
    <SignedOut><LoginPrompt feature="your watchlist" /></SignedOut>
  </>
);

export default WatchlistPage;
