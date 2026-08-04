import { useState } from 'react'
import './App.css'

import {
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'

import Homepage from './components/homepage/Homepage'
import MyMovies from './components/my-movies/MyMovies'
import { AllMovies } from './components/pages/all-movies/AllMovies'

import { useMovies } from './hooks/useMovies'
import { addMovie } from './repositories/movieRepository'

import type { WatchlistMovie } from './types'

type AddableMovie = {
  title: string
  genre?: string
}

function App() {
  const [watchlist, setWatchlist] =
    useState<WatchlistMovie[]>([])

  const { movies, error } = useMovies([], null)

  const { getToken, isSignedIn } = useAuth()
  const navigate = useNavigate()

  async function handleAddToMyMovies(
    movie: AddableMovie
  ) {
    if (!isSignedIn) {
      alert('Please log in before adding a movie.')
      return
    }

    const token = await getToken({
      skipCache: true,
    })

    if (!token) {
      alert('Unable to get your login session.')
      return
    }

    await addMovie(
      movie.title,
      movie.genre ?? 'Unknown',
      token
    )

    navigate('/my-movies')
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">MovieFlix</h1>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/all-movies">
                All Movies
              </NavLink>
            </li>

            <li>
              <NavLink to="/my-movies">
                My Movies
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="auth-button"
              >
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="auth-button"
              >
                Register
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                addToMyMovies={
                  handleAddToMyMovies
                }
              />
            }
          />

          <Route
            path="/all-movies"
            element={
              <AllMovies
                movies={movies}
                addToMyMovies={
                  handleAddToMyMovies
                }
                error={error}
              />
            }
          />

          <Route
            path="/my-movies"
            element={<MyMovies />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          Group Members: Navpreet Singh,
          Rajandeep Kaur, Jarone Guese
        </p>
      </footer>
    </div>
  )
}

export default App