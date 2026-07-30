// Footer — MovieFlex Sprint 5
// Shows watchlist count only when signed in (no count = not their data).

import { SignedIn, SignedOut } from '@clerk/clerk-react';
import useWatchlist from '../hooks/useWatchlist';

const FooterCount = () => {
  const { count } = useWatchlist();
  return <p className="footer-watchlist">📋 {count} movie{count !== 1 ? 's' : ''} in your watchlist</p>;
};

const Footer = () => (
  <footer className="site-footer">
    <p className="footer-copy">&copy; {new Date().getFullYear()} MovieFlex. All rights reserved.</p>
    <SignedIn><FooterCount /></SignedIn>
    <SignedOut><p className="footer-watchlist">Sign in to track your watchlist</p></SignedOut>
  </footer>
);

export default Footer;
