import { Router } from "express";
import { getAllMovies } from "../controllers/allMoviesController";

const router = Router();

router.get("/all-movies", getAllMovies);

export default router;