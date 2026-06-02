import { useState } from "react";
import { WatchlistMovie } from "../../types";
import { ALL_MOVIES, GENRES } from "../../data/movies";
import "./AllMovies.css";

interface AllMoviesProps {
  watchlist: WatchlistMovie[];
  setWatchlist: React.Dispatch<React.SetStateAction<WatchlistMovie[]>>;
}

type SortOption = "rating-desc" | "rating-asc" | "year-desc" | "year-asc" | "title-asc";

export default function AllMovies({ watchlist, setWatchlist }: AllMoviesProps) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortOption>("rating-desc");

  const isInWatchlist = (id: number) => watchlist.some((m) => m.id === id);

  const handleAdd = (movieId: number) => {
    const movie = ALL_MOVIES.find((m) => m.id === movieId);
    if (!movie || isInWatchlist(movieId)) return;
    const entry: WatchlistMovie = {
      ...movie,
      status: "plan-to-watch",
      addedAt: new Date().toISOString(),
    };
    setWatchlist((prev) => [...prev, entry]);
  };

  const handleRemove = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const filtered = ALL_MOVIES.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "All" || m.genre === genre;
    return matchSearch && matchGenre;
  }).sort((a, b) => {
    if (sort === "rating-desc") return b.rating - a.rating;
    if (sort === "rating-asc") return a.rating - b.rating;
    if (sort === "year-desc") return b.year - a.year;
    if (sort === "year-asc") return a.year - b.year;
    return a.title.localeCompare(b.title);
  });

  return (
    <section className="all-movies">
      <div className="all-movies__header">
        <h1 className="all-movies__title">All Movies</h1>
        <p className="all-movies__subtitle">
          Explore our full catalogue of {ALL_MOVIES.length} films
        </p>
      </div>

      {/* Filter Form — I.2 */}
      <div className="all-movies__filters">
        <div className="all-movies__filter-group">
          <label htmlFor="am-search" className="all-movies__label">Search</label>
          <input
            id="am-search"
            type="search"
            className="all-movies__input"
            placeholder="Title or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search all movies"
          />
        </div>
        <div className="all-movies__filter-group">
          <label htmlFor="am-genre" className="all-movies__label">Genre</label>
          <select
            id="am-genre"
            className="all-movies__select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="all-movies__filter-group">
          <label htmlFor="am-sort" className="all-movies__label">Sort by</label>
          <select
            id="am-sort"
            className="all-movies__select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="rating-desc">Rating ↓</option>
            <option value="rating-asc">Rating ↑</option>
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="title-asc">Title A–Z</option>
          </select>
        </div>
        <p className="all-movies__count" role="status" aria-live="polite">
          {filtered.length} film{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Movie List — I.3 */}
      {filtered.length === 0 ? (
        <p className="all-movies__empty">No movies match your filters.</p>
      ) : (
        <ul className="all-movies__grid" role="list">
          {filtered.map((movie) => {
            const added = isInWatchlist(movie.id);
            return (
              <li key={movie.id} className="all-movies__card">
                <div className="all-movies__card-top">
                  <span className="all-movies__poster" aria-hidden="true">{movie.poster}</span>
                  <div className="all-movies__meta">
                    <span className="all-movies__genre-tag">{movie.genre}</span>
                    <span className="all-movies__rating">★ {movie.rating}</span>
                  </div>
                </div>
                <h2 className="all-movies__card-title">{movie.title}</h2>
                <p className="all-movies__card-year">{movie.year}</p>
                <p className="all-movies__card-desc">{movie.description}</p>
                <div className="all-movies__card-actions">
                  {added ? (
                    <button
                      className="all-movies__btn all-movies__btn--remove"
                      onClick={() => handleRemove(movie.id)}
                      aria-label={`Remove ${movie.title} from watchlist`}
                    >
                      ✕ Remove
                    </button>
                  ) : (
                    <button
                      className="all-movies__btn all-movies__btn--add"
                      onClick={() => handleAdd(movie.id)}
                      aria-label={`Add ${movie.title} to My Movies`}
                    >
                      + Add to My Movies
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
