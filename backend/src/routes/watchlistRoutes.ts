// watchlistRoutes — Sprint 5: ALL routes require auth since watchlist is per-user.
// The GET also requires auth so we know which user's watchlist to return.

import { Router } from 'express';
import watchlistController from '../controllers/watchlistController';
import { requireAuth } from '../middleware/requireAuth';
import { validateIdParam } from '../middleware/validate';

const router = Router();

router.get('/watchlist', requireAuth, watchlistController.getAll);
router.post('/watchlist/:movieId/toggle', requireAuth, validateIdParam('movieId'), watchlistController.toggle);
router.post('/watchlist/:movieId/toggle-watched', requireAuth, validateIdParam('movieId'), watchlistController.toggleWatched);

export default router;
