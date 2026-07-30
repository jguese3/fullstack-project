// reviewRoutes — Sprint 5: ALL routes require auth since reviews are per-user.

import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import { requireAuth } from '../middleware/requireAuth';
import { validateBody, validateIdParam } from '../middleware/validate';

const router = Router();

router.get('/reviews', requireAuth, reviewController.getAll);
router.post('/reviews', requireAuth,
  validateBody({
    movieId: { type: 'number', required: true },
    text:    { type: 'string', required: true, min: 10, max: 300 },
    rating:  { type: 'number', required: true, min: 1, max: 10 },
  }),
  reviewController.create
);
router.delete('/reviews/:id', requireAuth, validateIdParam('id'), reviewController.delete);

export default router;
