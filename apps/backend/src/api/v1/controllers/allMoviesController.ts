import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import * as movieService from "../services/allMoviesService";
import { successResponse } from "../models/responseModel"

export const getAllMovies = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const auth = getAuth(req);
        const movies = await movieService.getAllMovies(auth.userId ?? undefined);
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
        const auth = getAuth(req);
        const updatedMovie = await movieService.updateMovie(
            Number.parseInt(req.params.id as string),
            req.body,
            auth.userId ?? undefined
        );
        res.json(successResponse(updatedMovie, "Movie updated successfully"));
    } catch (error) {
        next(error);
    }   
};
