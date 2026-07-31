import { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react'

import MyMovies from './components/my-movies/MyMovies'
import Homepage from './components/homepage/Homepage'
import type { WatchlistMovie } from './types'
import { AllMovies } from './components/pages/all-movies/AllMovies'
import { useMovies } from './hooks/useMovies'

function App() {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([])
  const { movies, toggleWatchlist, error } = useMovies([], null)

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">MovieFlix</h1>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/all-movies">All Movies</NavLink>
            </li>

            <li>
              <NavLink to="/my-movies">My Movies</NavLink>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className="auth-button">
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button type="button" className="auth-button">
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
              />
            }
          />

          <Route
            path="/all-movies"
            element={
              <AllMovies
                movies={movies}
                toggleWatchlist={toggleWatchlist}
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
          Group Members: Navpreet Singh, Rajandeep Kaur,
          Jarone Guese
        </p>
      </footer>
    </div>
  )
}

export default App