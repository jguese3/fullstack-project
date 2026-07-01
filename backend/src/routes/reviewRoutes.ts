// reviewRoutes — covers exactly what ReviewsPage needs: list, create, delete.

import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import { validateBody, validateIdParam } from '../middleware/validate';

const router = Router();

router.get('/reviews', reviewController.getAll);

router.post(
  '/reviews',
  validateBody({
    movieId: { type: 'number', required: true },
    text: { type: 'string', required: true, min: 10, max: 300 },
    rating: { type: 'number', required: true, min: 1, max: 10 },
  }),
  reviewController.create
);

router.delete(
  '/reviews/:id',
  validateIdParam('id'),
  reviewController.delete
);

export default router;
