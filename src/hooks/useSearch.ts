// useSearch — presentation hook for filtering a movie list.
//
// What it does:
//   Manages the search query string and selected genre in local state.
//   Delegates filtering logic to movieService.filter() — no business
//   rules live in this hook.
//   Returns the filtered list along with current values and setters.
//
// What it does NOT do:
//   Does not define what "matching" means — that is movieService's concern.
//   Does not fetch or mutate data — that belongs to the repository layer.
//
// Invoked in: CataloguePage

import { useState, useMemo } from 'react';
import { Movie, Genre } from '../types';
import movieService from '../services/movieService';

interface UseSearchResult {
  /** Current text query entered by the user */
  query: string;
  /** Setter for the text query */
  setQuery: (q: string) => void;
  /** Currently selected genre filter, or '' for all genres */
  selectedGenre: Genre | '';
  /** Setter for the genre filter */
  setSelectedGenre: (g: Genre | '') => void;
  /** The filtered subset of the provided movie list */
  filtered: Movie[];
}

const useSearch = (movies: Movie[]): UseSearchResult => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | ''>('');

  const filtered = useMemo(
    () => movieService.filter(movies, { query, genre: selectedGenre }),
    [movies, query, selectedGenre]
  );

  return { query, setQuery, selectedGenre, setSelectedGenre, filtered };
};

export default useSearch;
