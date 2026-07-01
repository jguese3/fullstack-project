// watchlistRoutes — covers exactly what CataloguePage and WatchlistPage need:
// fetching the list, toggling add/remove, and toggling watched status.
// No DELETE route exists separately because toggle already handles removal.

import { Router } from 'express';
import watchlistController from '../controllers/watchlistController';
import { validateIdParam } from '../middleware/validate';

const router = Router();

router.get('/watchlist', watchlistController.getAll);

router.post(
  '/watchlist/:movieId/toggle',
  validateIdParam('movieId'),
  watchlistController.toggle
);

router.post(
  '/watchlist/:movieId/toggle-watched',
  validateIdParam('movieId'),
  watchlistController.toggleWatched
);

export default router;
