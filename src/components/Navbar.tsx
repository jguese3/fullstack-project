// Navbar — navigation between feature pages.
// NavLink from react-router-dom automatically applies the active class.

import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" aria-label="Main navigation">
    <ul className="navbar-list">
      <li>
        <NavLink
          to="/catalogue"
          className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}
        >
          🎥 Catalogue
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}
        >
          📋 Watchlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/reviews"
          className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}
        >
          ⭐ Reviews
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
