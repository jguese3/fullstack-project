import { useState } from 'react'
import './MyMovies.css'
import { getAllMovies } from '../../repositories/movieRepository'

import {
  createMovie,
  removeMovieById,
} from '../../services/movieService'

/**
 * This component displays movies using data from the movie repository.
 * It uses movieService for movie creation and removal.
 * The repository provides movie data for the component.
 */
function MyMovies() {
  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')

  const [movies, setMovies] = useState(getAllMovies())

  function handleAddMovie(event: any) {
    event.preventDefault()

    const newMovie = createMovie(
      movieTitle,
      movieGenre,
      getAllMovies()[0].image
    )

    setMovies([...movies, newMovie])
    setMovieTitle('')
    setMovieGenre('')
  }

  function handleRemoveMovie(id: number) {
    const updatedMovies = removeMovieById(movies, id)
    setMovies(updatedMovies)
  }

  return (
    <section className="my-movies" aria-labelledby="my-movies-heading">
      <h2 id="my-movies-heading">My Movies</h2>

      <p>
        These are movies saved in the user's personal movie collection.
      </p>

      <form className="movie-form" onSubmit={handleAddMovie}>
        <label htmlFor="movie-title">Movie Title</label>

        <input
          id="movie-title"
          type="text"
          value={movieTitle}
          onChange={(event) => setMovieTitle(event.target.value)}
          placeholder="Enter movie title"
        />

        <label htmlFor="movie-genre">Genre</label>

        <input
          id="movie-genre"
          type="text"
          value={movieGenre}
          onChange={(event) => setMovieGenre(event.target.value)}
          placeholder="Enter movie genre"
        />

        <button type="submit">Add Movie</button>
      </form>

      <div className="movie-card-list">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <img
              src={movie.image}
              alt={movie.title}
              className="movie-image"
            />

            <div className="movie-info">
              <h3>{movie.title}</h3>

              <p>Genre: {movie.genre}</p>

              <p>Status: {movie.status}</p>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveMovie(movie.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyMovies
