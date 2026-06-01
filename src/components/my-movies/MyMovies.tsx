import { useState } from 'react'
import './MyMovies.css'

import gameOfThrones from '../../assets/gameofthrones.jpg'
import spiderMan from '../../assets/spiderman.jpg'
import insideOut from '../../assets/insideout.jpg'

function MyMovies() {
  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Game of Thrones',
      genre: 'Thriller',
      status: 'Watched',
      image: gameOfThrones,
    },
    {
      id: 2,
      title: 'Spider-Man: No Way Home',
      genre: 'Superhero',
      status: 'Watching',
      image: spiderMan,
    },
    {
      id: 3,
      title: 'Inside Out',
      genre: 'Animation',
      status: 'Saved',
      image: insideOut,
    },
  ])

  function handleAddMovie(event: any) {
    event.preventDefault()

    const newMovie = {
      id: Date.now(),
      title: movieTitle,
      genre: movieGenre,
      status: 'Saved',
      image: insideOut,
    }

    setMovies([...movies, newMovie])
    setMovieTitle('')
    setMovieGenre('')
  }

  function handleRemoveMovie(id: number) {
    setMovies(movies.filter((movie) => movie.id !== id))
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