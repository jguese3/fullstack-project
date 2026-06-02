import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WatchlistMovie } from "../../types";
import { ALL_MOVIES, GENRES } from "../../data/movies";
import "./homepage.css";

interface HomepageProps {
  watchlist: WatchlistMovie[];
  setWatchlist: React.Dispatch<React.SetStateAction<WatchlistMovie[]>>;
}

export default function Homepage({ watchlist, setWatchlist }: HomepageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  const filtered = ALL_MOVIES.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || m.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const isInWatchlist = (id: number) => watchlist.some((m) => m.id === id);

  const handleAddToWatchlist = (movieId: number) => {
    const movie = ALL_MOVIES.find((m) => m.id === movieId);
    if (!movie || isInWatchlist(movieId)) return;
    const entry: WatchlistMovie = {
      ...movie,
      status: "plan-to-watch",
      addedAt: new Date().toISOString(),
    };
    setWatchlist((prev) => [...prev, entry]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="homepage">
      {/* Hero */}
      <div className="homepage__hero">
        <div className="homepage__hero-content">
          <p className="homepage__hero-eyebrow">Your personal movie catalogue</p>
          <h1 className="homepage__hero-title">
            Discover. Track.{" "}
            <span className="homepage__hero-accent">Review.</span>
          </h1>
          <p className="homepage__hero-subtitle">
            Browse thousands of films, build your watchlist, and share your
            reviews with the MovieFlix community.
          </p>
          <div className="homepage__hero-actions">
            <button
              className="homepage__btn homepage__btn--primary"
              onClick={() => navigate("/all-movies")}
            >
              Browse All Movies
            </button>
            <button
              className="homepage__btn homepage__btn--secondary"
              onClick={() => navigate("/my-movies")}
            >
              My Movies
              {watchlist.length > 0 && (
                <span className="homepage__hero-count">{watchlist.length}</span>
              )}
            </button>
          </div>
        </div>
        <div className="homepage__hero-badge">
          <span className="homepage__hero-badge-number">
            {ALL_MOVIES.length}
          </span>
          <span className="homepage__hero-badge-label">Films catalogued</span>
        </div>
      </div>

      {/* Search Form — I.2 Form Component */}
      <div className="homepage__search-section">
        <form
          className="homepage__search-form"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <label htmlFor="movie-search" className="homepage__search-label">
            Search Films
          </label>
          <div className="homepage__search-row">
            <input
              id="movie-search"
              type="search"
              className="homepage__search-input"
              placeholder="Search by title or genre…"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search movies by title or genre"
            />
            {searchQuery && (
              <button
                type="button"
                className="homepage__search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="homepage__search-results-count" role="status" aria-live="polite">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </form>
      </div>

      {/* Genre Filter */}
      <div className="homepage__genre-section">
        <h2 className="homepage__section-title">Browse by Genre</h2>
        <ul className="homepage__genre-list" role="list">
          {GENRES.map((genre) => (
            <li key={genre} className="homepage__genre-item">
              <button
                className={`homepage__genre-btn${selectedGenre === genre ? " homepage__genre-btn--active" : ""}`}
                onClick={() => setSelectedGenre(genre)}
                aria-pressed={selectedGenre === genre}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Movies — I.3 Element Addition/Removal */}
      <div className="homepage__featured">
        <h2 className="homepage__section-title">
          {selectedGenre === "All" && !searchQuery
            ? "Featured Films"
            : `Results (${filtered.length})`}
        </h2>

        {filtered.length === 0 ? (
          <p className="homepage__empty">No movies match your search. Try a different title or genre.</p>
        ) : (
          <ul className="homepage__movies-grid" role="list">
            {filtered.map((movie) => {
              const added = isInWatchlist(movie.id);
              return (
                <li key={movie.id} className="homepage__movie-card">
                  <div className="homepage__movie-header">
                    <span className="homepage__movie-genre">{movie.genre}</span>
                    <span className="homepage__movie-rating">★ {movie.rating}</span>
                  </div>
                  <div className="homepage__movie-poster" aria-hidden="true">
                    {movie.poster}
                  </div>
                  <h3 className="homepage__movie-title">{movie.title}</h3>
                  <p className="homepage__movie-year">{movie.year}</p>
                  <p className="homepage__movie-description">{movie.description}</p>
                  <button
                    className={`homepage__movie-btn${added ? " homepage__movie-btn--added" : ""}`}
                    onClick={() => handleAddToWatchlist(movie.id)}
                    disabled={added}
                    aria-label={added ? `${movie.title} is in your watchlist` : `Add ${movie.title} to My Movies`}
                  >
                    {added ? "✓ In My Movies" : "+ Add to My Movies"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
