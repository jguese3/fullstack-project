// Header — MovieFlex branding

import Navbar from './Navbar';

const Header = () => (
  <header className="site-header">
    <div className="header-inner">
      <div className="brand">
        <span className="brand-icon">🎬</span>
        <span className="brand-name">MovieFlex</span>
        <span className="brand-tagline">Your Movie Universe</span>
      </div>
    </div>
    <Navbar />
  </header>
);

export default Header;
