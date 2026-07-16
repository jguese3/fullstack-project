import { Router } from "express";
import { getAllMovies, updateMovie } from "../controllers/allMoviesController";

const router = Router();

router.get("/all-movies", getAllMovies);
router.put("/all-movies/:id", updateMovie);

export default router;
