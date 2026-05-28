import { useState } from 'react'
import './App.css'
import MyMovies from './components/my-movies/MyMovies'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">MovieFlix</h1>

        <nav>
          <ul className="nav-links">
            <li>
              <button
                className={page === 'home' ? 'active-link' : ''}
                onClick={() => setPage('home')}
              >
                Home
              </button>
            </li>

            <li>
              <button
                className={page === 'all' ? 'active-link' : ''}
                onClick={() => setPage('all')}
              >
                All Movies
              </button>
            </li>

            <li>
              <button
                className={page === 'my' ? 'active-link' : ''}
                onClick={() => setPage('my')}
              >
                My Movies
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {page === 'home' && (
          <>
            <h2>Welcome to MovieFlix</h2>

            <p>
              Discover and manage your favorite movies in one place.
            </p>
          </>
        )}

        {page === 'all' && (
          <>
            <h2>All Movies</h2>

            <p>
              Browse all available movies in the platform.
            </p>
          </>
        )}

        {page === 'my' && <MyMovies />}
      </main>

      <footer className="footer">
        <p>
          Group Members: Navpreet Singh, Rajandeep Kaur, Jarone Guese
        </p>
      </footer>
    </div>
  )
}

export default App
