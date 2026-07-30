// Navbar — MovieFlex Sprint 5
// Includes Clerk auth: SignInButton (when signed out), UserButton (when signed in).
// T.3: "Means of doing so should be obvious to the user"

import { NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

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

    <div className="navbar-auth">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="auth-btn auth-btn--signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {/* UserButton shows user avatar with sign-out dropdown */}
        <UserButton afterSignOutUrl="/catalogue" />
      </SignedIn>
    </div>
  </nav>
);

export default Navbar;
