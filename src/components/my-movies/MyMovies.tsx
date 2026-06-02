import { useState } from "react";
import { WatchlistMovie, WatchStatus } from "../../types";
import "./MyMovies.css";

interface MyMoviesProps {
  watchlist: WatchlistMovie[];
  setWatchlist: React.Dispatch<React.SetStateAction<WatchlistMovie[]>>;
}

const STATUS_LABELS: Record<WatchStatus, string> = {
  "watched": "✅ Watched",
  "watching": "▶️ Watching",
  "plan-to-watch": "📋 Plan to Watch",
};

const STATUS_OPTIONS: WatchStatus[] = ["plan-to-watch", "watching", "watched"];

export default function MyMovies({ watchlist, setWatchlist }: MyMoviesProps) {
  const [filterStatus, setFilterStatus] = useState<WatchStatus | "all">("all");
  const [noteInputs, setNoteInputs] = useState<Record<number, string>>({});

  const handleRemove = (id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const handleStatusChange = (id: number, status: WatchStatus) => {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const handleNoteChange = (id: number, value: string) => {
    setNoteInputs((prev) => ({ ...prev, [id]: value }));
  };

  const filtered =
    filterStatus === "all"
      ? watchlist
      : watchlist.filter((m) => m.status === filterStatus);

  const counts = {
    all: watchlist.length,
    watched: watchlist.filter((m) => m.status === "watched").length,
    watching: watchlist.filter((m) => m.status === "watching").length,
    "plan-to-watch": watchlist.filter((m) => m.status === "plan-to-watch").length,
  };

  return (
    <section className="my-movies">
      <div className="my-movies__header">
        <h1 className="my-movies__title">My Movies</h1>
        <p className="my-movies__subtitle">
          Your personal watchlist — {watchlist.length} film{watchlist.length !== 1 ? "s" : ""} tracked
        </p>
      </div>

      {/* Stats */}
      <ul className="my-movies__stats" role="list" aria-label="Watchlist statistics">
        {(["all", "plan-to-watch", "watching", "watched"] as const).map((s) => (
          <li key={s}>
            <button
              className={`my-movies__stat-btn${filterStatus === s ? " my-movies__stat-btn--active" : ""}`}
              onClick={() => setFilterStatus(s)}
              aria-pressed={filterStatus === s}
            >
              <span className="my-movies__stat-num">{counts[s]}</span>
              <span className="my-movies__stat-label">
                {s === "all" ? "All" : STATUS_LABELS[s]}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* List — I.3 Element Addition/Removal */}
      {watchlist.length === 0 ? (
        <div className="my-movies__empty">
          <p className="my-movies__empty-icon">🎬</p>
          <p className="my-movies__empty-text">Your watchlist is empty.</p>
          <p className="my-movies__empty-hint">Browse the catalogue and add some films!</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="my-movies__no-results">No movies with this status yet.</p>
      ) : (
        <ul className="my-movies__list" role="list">
          {filtered.map((movie) => (
            <li key={movie.id} className="my-movies__item">
              <div className="my-movies__item-left">
                <span className="my-movies__item-poster" aria-hidden="true">{movie.poster}</span>
                <div className="my-movies__item-info">
                  <h2 className="my-movies__item-title">{movie.title}</h2>
                  <p className="my-movies__item-meta">
                    {movie.genre} &bull; {movie.year} &bull; ★ {movie.rating}
                  </p>
                </div>
              </div>

              <div className="my-movies__item-right">
                {/* I.2 Form Component — status selector */}
                <div className="my-movies__status-group">
                  <label
                    htmlFor={`status-${movie.id}`}
                    className="my-movies__status-label"
                  >
                    Status
                  </label>
                  <select
                    id={`status-${movie.id}`}
                    className={`my-movies__status-select my-movies__status-select--${movie.status}`}
                    value={movie.status}
                    onChange={(e) =>
                      handleStatusChange(movie.id, e.target.value as WatchStatus)
                    }
                    aria-label={`Update status for ${movie.title}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Note input — I.2 Form Component */}
                <div className="my-movies__note-group">
                  <label
                    htmlFor={`note-${movie.id}`}
                    className="my-movies__status-label"
                  >
                    Note
                  </label>
                  <input
                    id={`note-${movie.id}`}
                    type="text"
                    className="my-movies__note-input"
                    placeholder="Add a note…"
                    value={noteInputs[movie.id] || ""}
                    onChange={(e) => handleNoteChange(movie.id, e.target.value)}
                    aria-label={`Add note for ${movie.title}`}
                    maxLength={120}
                  />
                </div>

                <button
                  className="my-movies__remove-btn"
                  onClick={() => handleRemove(movie.id)}
                  aria-label={`Remove ${movie.title} from watchlist`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
