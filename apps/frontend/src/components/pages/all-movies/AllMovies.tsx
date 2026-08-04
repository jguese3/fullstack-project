import type { Movies } from '../../../types/movies'

import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay'

import './AllMovies.css'

type AllMoviesProps = {
  movies: Movies[]

  addToMyMovies: (
    movie: Movies
  ) => Promise<void>

  error: string | null
}

export function AllMovies({
  movies,
  addToMyMovies,
  error,
}: AllMoviesProps) {
  return (
    <section className="all-movies">
      <header className="all-movies__header">
        <h1 className="all-movies__title">
          All Movies
        </h1>
      </header>

      <main className="all-movies__content">
        {error && (
          <p className="all-movies__error">
            {error}
          </p>
        )}

        <MovieListDisplay
          movies={movies}
          onAddToMyMovies={
            addToMyMovies
          }
        />
      </main>
    </section>
  )
}