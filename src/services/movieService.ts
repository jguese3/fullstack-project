import type { Movie } from '../types/Movie'
import { getAllMovies } from '../repositories/movieRepository'

export function getMovies(): Movie[] {
  return getAllMovies()
}

export function createMovie(
  title: string,
  genre: string,
  image: string
): Movie {
  return {
    id: Date.now(),
    title,
    genre,
    status: 'Saved',
    image,
  }
}

export function removeMovieById(
  movies: Movie[],
  id: number
): Movie[] {
  return movies.filter((movie) => movie.id !== id)
}