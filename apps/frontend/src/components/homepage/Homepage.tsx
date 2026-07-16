import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import type { WatchlistMovie } from "../../types";
import { ALL_MOVIES, GENRES } from "../../data/movies";
import "./homepage.css";

interface HomepageProps {
  watchlist: WatchlistMovie[];
  setWatchlist: Dispatch<SetStateAction<WatchlistMovie[]>>;
}

export default function Homepage({
  watchlist,
  setWatchlist,
}: HomepageProps) {
  const [searchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  const filtered = ALL_MOVIES.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || m.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const isInWatchlist = (id: number) =>
    watchlist.some((m) => m.id === id);

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

  return (
    <section className="homepage">
      <div className="homepage__hero">
        <div className="homepage__hero-content">
          <p className="homepage__hero-eyebrow">
            Your personal movie catalogue
          </p>

          <h1 className="homepage__hero-title">
            Discover. Track.
            <span className="homepage__hero-accent"> Review.</span>
          </h1>

          <p className="homepage__hero-subtitle">
            Browse movies, build your watchlist, and track what you want to
            watch next.
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
            </button>
          </div>
        </div>

        <div className="homepage__hero-badge">
          <span className="homepage__hero-badge-number">
            {ALL_MOVIES.length}
          </span>
          <span className="homepage__hero-badge-label">
            Movies Available
          </span>
        </div>
      </div>

      <div className="homepage__genre-section">
        <h2 className="homepage__section-title">Browse by Genre</h2>

        <ul className="homepage__genre-list">
          {GENRES.map((genre) => (
            <li key={genre} className="homepage__genre-item">
              <button
                className="homepage__genre-btn"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="homepage__featured">
        <h2 className="homepage__section-title">Featured Films</h2>

        <ul className="homepage__movies-grid">
          {filtered.map((movie) => {
            const added = isInWatchlist(movie.id);

            return (
              <li key={movie.id} className="homepage__movie-card">
                <div className="homepage__movie-header">
                  <span className="homepage__movie-genre">
                    {movie.genre}
                  </span>

                  <span className="homepage__movie-rating">
                    ★ {movie.rating}
                  </span>
                </div>

                <h3 className="homepage__movie-title">
                  {movie.title}
                </h3>

                <p className="homepage__movie-year">
                  {movie.year}
                </p>

                <p className="homepage__movie-description">
                  {movie.description}
                </p>

                <button
                  className="homepage__movie-btn"
                  onClick={() => handleAddToWatchlist(movie.id)}
                  disabled={added}
                >
                  {added ? "✓ In My Movies" : "+ Add to My Movies"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}