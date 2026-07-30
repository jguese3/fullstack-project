// useSearch — unchanged from Sprint 4, filtering runs client-side.

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
