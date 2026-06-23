/**
 * CataloguePage — /catalogue
 *
 * Architecture usage (satisfies I.3):
 *
 * HOOK (useWatchlist):
 *   Called here to get the current watchlist state and the toggleWatchlist
 *   action. The hook manages all presentation state for the watchlist and
 *   delegates business logic to watchlistService. Using the hook here instead
 *   of receiving props eliminates the prop-drilling from Sprint 2 (T.4).
 *
 * HOOK (useSearch):
 *   Called here to manage the search query and genre filter state.
 *   Delegates the actual filtering logic to movieService.filter() internally.
 *
 * SERVICE (via useSearch → movieService.filter):
 *   The filtering rules (what "matching" means) live in movieService, not
 *   in this component or the hook. The component never touches business logic.
 *
 * REPOSITORY (via useWatchlist → watchlistService → watchlistRepo):
 *   All watchlist reads/writes ultimately go through watchlistRepo. This
 *   component never imports or touches any repo or data file directly.
 */

import movieService from '../services/movieService';
import useSearch from '../hooks/useSearch';
import useWatchlist from '../hooks/useWatchlist';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const CataloguePage = () => {
  const movies = movieService.getAll();
  const { query, setQuery, selectedGenre, setSelectedGenre, filtered } = useSearch(movies);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <main className="page-main">
      <div className="page-header">
        <h2 className="page-title">Movie Catalogue</h2>
        <p className="page-subtitle">Discover and add movies to your watchlist</p>
      </div>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎞️</span>
          <p>No movies match your search. Try a different title or genre.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filtered.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={isInWatchlist(movie.id)}
              onToggleWatchlist={toggleWatchlist}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default CataloguePage;
