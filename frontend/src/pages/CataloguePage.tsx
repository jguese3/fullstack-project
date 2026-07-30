// CataloguePage — /catalogue
// Public page — all users can browse. Watchlist toggle requires being signed in.
// useWatchlist handles the auth state — if not signed in, isInWatchlist always false
// and toggleWatchlist silently does nothing (no token = no-op in the hook).

import { useState, useEffect } from 'react';
import { Movie } from '../types';
import movieService from '../services/movieService';
import useSearch from '../hooks/useSearch';
import useWatchlist from '../hooks/useWatchlist';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const CataloguePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    movieService.getAll()
      .then(setMovies)
      .catch((err: Error) => setError(`Could not load movies: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  const { query, setQuery, selectedGenre, setSelectedGenre, filtered } = useSearch(movies);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (loading) return <main className="page-main"><p className="loading-text">🎬 Loading movies…</p></main>;
  if (error)   return <main className="page-main"><p className="form-error">{error}</p></main>;

  return (
    <main className="page-main">
      <div className="page-header">
        <h2 className="page-title">Movie Catalogue</h2>
        <p className="page-subtitle">Discover films and build your personal watchlist</p>
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
          <p>No movies match your search.</p>
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
