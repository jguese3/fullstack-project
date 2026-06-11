// App — sets up React Router only.
//
// Sprint 3 refactor: all shared watchlist state that was prop-drilled from
// here in Sprint 2 (T.3) has been removed. Each page now owns its own
// data concerns via the hook-service-repository architecture (T.4).
// App is now a pure routing shell with no state of its own.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CataloguePage from './pages/CataloguePage';
import WatchlistPage from './pages/WatchlistPage';
import ReviewsPage from './pages/ReviewsPage';
import './index.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/catalogue" replace />} />
        <Route path="catalogue" element={<CataloguePage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
