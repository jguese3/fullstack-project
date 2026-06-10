type Movie = {
  id: number
  title: string
  genre: string
  status: string
  image: string
}

export function createMovie(title: string, genre: string, image: string): Movie {
  return {
    id: Date.now(),
    title,
    genre,
    status: 'Saved',
    image,
  }
}

export function removeMovieById(movies: Movie[], id: number): Movie[] {
  return movies.filter((movie) => movie.id !== id)
}