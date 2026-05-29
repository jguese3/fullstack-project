import { NavLink } from "react-router-dom";
import "./Nav.css";

interface NavProps {
  watchlistCount: number;
}

export default function Nav({ watchlistCount }: NavProps) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav__brand">
        <span className="nav__logo">🎬</span>
        <span className="nav__title">CineLog</span>
      </div>
      <ul className="nav__links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav__link nav__link--active" : "nav__link"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/all-movies"
            className={({ isActive }) =>
              isActive ? "nav__link nav__link--active" : "nav__link"
            }
          >
            All Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-movies"
            className={({ isActive }) =>
              isActive ? "nav__link nav__link--active" : "nav__link"
            }
          >
            My Movies
            {watchlistCount > 0 && (
              <span className="nav__badge">{watchlistCount}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
