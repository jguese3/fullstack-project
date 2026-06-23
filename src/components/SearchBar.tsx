// SearchBar — form component for filtering movies by title/director and genre.
// Updates in real time via controlled inputs (I.2).
// Receives state and setters as props so the parent sees changes immediately.

import { Genre } from '../types';

const GENRES: Genre[] = [
  'Action', 'Animation', 'Comedy', 'Documentary',
  'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller',
];

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedGenre: Genre | '';
  onGenreChange: (g: Genre | '') => void;
  resultCount: number;
}

const SearchBar = ({
  query,
  onQueryChange,
  selectedGenre,
  onGenreChange,
  resultCount,
}: SearchBarProps) => (
  <div className="search-bar">
    <div className="search-fields">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or director..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search movies"
        />
        {query && (
          <button className="search-clear" onClick={() => onQueryChange('')} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
      <select
        className="genre-select"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value as Genre | '')}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
    <p className="search-results-count">
      {resultCount} movie{resultCount !== 1 ? 's' : ''} found
    </p>
  </div>
);

export default SearchBar;
