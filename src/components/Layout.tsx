// Layout — shared shell for all routes.
//
// Sprint 3 refactor: no longer receives watchlist as a prop.
// The Footer now calls useWatchlist directly to get the count,
// eliminating the prop-drilling chain that existed in Sprint 2.

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
