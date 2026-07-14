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


