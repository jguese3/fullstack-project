// movieRoutes — only a GET route exists, since the front-end never creates,
// updates, or deletes movies; it only browses the catalogue.

import { Router } from 'express';
import movieController from '../controllers/movieController';

const router = Router();

router.get('/movies', movieController.getAll);

export default router;
