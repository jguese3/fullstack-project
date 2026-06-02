<<<<<<< HEAD
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

=======
import "./homepage.css";

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
}

const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
  },
  {
    id: 3,
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    rating: 8.5,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: 4,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and witches.",
  },
  {
    id: 5,
    title: "Dune",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset: a desert planet capable of producing a unique resource.",
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    genre: "Comedy",
    year: 2022,
    rating: 7.8,
    description:
      "An aging Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes.",
  },
];

const genres: string[] = [
  "All",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Comedy",
  "Drama",
];

export default function Homepage() {
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
  return (
    <section className="homepage">
      {/* Hero */}
      <div className="homepage__hero">
        <div className="homepage__hero-content">
          <p className="homepage__hero-eyebrow">Your personal movie catalogue</p>
          <h1 className="homepage__hero-title">
<<<<<<< HEAD
            Discover. Track.{" "}
            <span className="homepage__hero-accent">Review.</span>
=======
            Discover. Track. <span className="homepage__hero-accent">Review.</span>
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
          </h1>
          <p className="homepage__hero-subtitle">
            Browse thousands of films, build your watchlist, and share your
            reviews with the CineLog community.
          </p>
          <div className="homepage__hero-actions">
<<<<<<< HEAD
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
=======
            <button className="homepage__btn homepage__btn--primary">
              Browse All Movies
            </button>
            <button className="homepage__btn homepage__btn--secondary">
              My Movies
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
            </button>
          </div>
        </div>
        <div className="homepage__hero-badge">
<<<<<<< HEAD
          <span className="homepage__hero-badge-number">
            {ALL_MOVIES.length}
          </span>
=======
          <span className="homepage__hero-badge-number">10K+</span>
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
          <span className="homepage__hero-badge-label">Films catalogued</span>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Genre Filter */}
      <div className="homepage__genre-section">
        <h2 className="homepage__section-title">Browse by Genre</h2>
        <ul className="homepage__genre-list">
          {genres.map((genre) => (
            <li key={genre} className="homepage__genre-item">
              <button className="homepage__genre-btn">{genre}</button>
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
            </li>
          ))}
        </ul>
      </div>

<<<<<<< HEAD
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
=======
      {/* Featured Movies */}
      <div className="homepage__featured">
        <h2 className="homepage__section-title">Featured Films</h2>
        <ul className="homepage__movies-grid">
          {featuredMovies.map((movie) => (
            <li key={movie.id} className="homepage__movie-card">
              <div className="homepage__movie-header">
                <span className="homepage__movie-genre">{movie.genre}</span>
                <span className="homepage__movie-rating">
                  ★ {movie.rating}
                </span>
              </div>
              <h3 className="homepage__movie-title">{movie.title}</h3>
              <p className="homepage__movie-year">{movie.year}</p>
              <p className="homepage__movie-description">{movie.description}</p>
              <button className="homepage__movie-btn">+ Add to My Movies</button>
            </li>
          ))}
        </ul>
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
      </div>
    </section>
  );
}
