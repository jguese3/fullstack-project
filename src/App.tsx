import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import MyMovies from './components/my-movies/MyMovies'

function App() {
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
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Welcome to MovieFlix</h2>
                <p>Discover and manage your favorite movies in one place.</p>
              </>
            }
          />

          <Route
            path="/all-movies"
            element={
              <>
                <h2>All Movies</h2>
                <p>Browse all available movies in the platform.</p>
              </>
            }
          />

          <Route path="/my-movies" element={<MyMovies />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Group Members: Navpreet Singh, Rajandeep Kaur, Jarone Guese</p>
      </footer>
    </div>
  )
}

export default App