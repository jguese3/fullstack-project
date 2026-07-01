// useSearch — presentation hook for filtering a movie list.
// Unchanged from Sprint 3 — filtering still runs client-side on the
// already-fetched list. Only the movies list itself now comes from the
// backend (fetched by the page before being passed here).

import { useState, useMemo } from 'react';
import { Movie, Genre } from '../types';
import movieService from '../services/movieService';

interface UseSearchResult {
  query: string;
  setQuery: (q: string) => void;
  selectedGenre: Genre | '' | string;
  setSelectedGenre: (g: Genre | '' | string) => void;
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
