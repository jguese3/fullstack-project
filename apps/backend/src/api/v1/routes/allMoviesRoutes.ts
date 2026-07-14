import { Router } from "express";
import { getAllMovies } from "../controllers/allMoviesController";

const router = Router();

router.get("/movies", getAllMovies);

export default router;