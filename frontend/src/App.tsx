// App — MovieFlex Sprint 5
// Pure routing shell. ClerkProvider wraps everything in main.tsx.

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
        <Route path="reviews"   element={<ReviewsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
