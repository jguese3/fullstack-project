import './App.css'
// import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">MovieFlix</h1>

        <nav>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/">All Movies</a>
            </li>

            <li>
              <a href="/">My Movies</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2>Welcome to MovieFlix</h2>

        <p>
          Discover and manage your favorite movies in one place.
        </p>
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
