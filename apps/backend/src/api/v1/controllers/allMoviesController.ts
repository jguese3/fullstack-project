import { Request, Response, NextFunction } from "express";
import * as movieService from "../services/allMoviesService";
import { successResponse } from "../models/responseModel"

export const getAllMovies = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const movies = await movieService.getAllMovies();
        res.status(200).json(
            successResponse(movies, "Movies retrieved succesfully")
        );
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const updatedMovie = await movieService.updateMovie(
            Number.parseInt(req.params.id as string),
            req.body
        );
        res.json(successResponse(updatedMovie, "Movie updated successfully"));
    } catch (error) {
        next(error);
    }   
};
