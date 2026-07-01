// Footer — site-wide footer.
//
// Sprint 3 refactor: uses useWatchlist hook directly to get the watchlist
// count rather than receiving it as a prop from App. This removes the
// prop-drilling chain (App → Layout → Footer) from Sprint 2.

import useWatchlist from '../hooks/useWatchlist';

const Footer = () => {
  const { count } = useWatchlist();

  return (
    <footer className="site-footer">
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} CineLog. All rights reserved.
      </p>
      <p className="footer-watchlist">
        📋 {count} movie{count !== 1 ? 's' : ''} in your watchlist
      </p>
    </footer>
  );
};

export default Footer;
