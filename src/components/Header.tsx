// Header — site-wide header with logo and Navbar.

import Navbar from './Navbar';

const Header = () => (
  <header className="site-header">
    <div className="header-inner">
      <div className="brand">
        <span className="brand-icon">🎬</span>
        <span className="brand-name">CineLog</span>
        <span className="brand-tagline">Your Movie Catalogue</span>
      </div>
    </div>
    <Navbar />
  </header>
);

export default Header;
