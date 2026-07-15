import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

const createMovieSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  genre: Joi.string().trim().min(1).required(),
  status: Joi.string()
    .valid('Saved', 'Watching', 'Watched')
    .required(),
})

export function validateCreateMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createMovieSchema.validate(req.body)

  if (error) {
    res.status(400).json({
      message: error.details[0].message,
    })
    return
  }

  next()
}