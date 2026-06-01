import { useState } from 'react'
import './App.css'
// import MyMovies from './components/my-movies/MyMovies'
import { AllMovies } from './components/pages/all-movies/AllMovies'
import type { Movie } from './types/movies';
import { sampleMovies } from './movies/movieData'

function App() {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies)

  return (
    <AllMovies movies={movies} updateMovies={setMovies} />
  )
}
export default App
