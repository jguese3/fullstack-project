import { useState } from 'react'

import type { JSX } from 'react'
import type { Movies } from '../../types/movies'

import { MovieCard } from '../movie-card/MovieCard'

import './MovieListDisplay.css'

type MovieListDisplayProps = {
  movies: Movies[]

  onAddToMyMovies: (
    movie: Movies
  ) => Promise<void>
}

export function MovieListDisplay({
  movies,
  onAddToMyMovies,
}: MovieListDisplayProps) {
  const [
    expandedMovieId,
    setExpandedMovieId,
  ] = useState<number | null>(null)

  const movieListItems: JSX.Element[] =
    movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        isExpanded={
          movie.id === expandedMovieId
        }
        onTitleClick={() => {
          setExpandedMovieId(
            movie.id === expandedMovieId
              ? null
              : movie.id
          )
        }}
        onAddToMyMovies={() =>
          onAddToMyMovies(movie)
        }
      />
    ))

  return (
    <div className="movie-list-display">
      {movieListItems}
    </div>
  )
}