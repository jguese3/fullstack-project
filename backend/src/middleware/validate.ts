// validate.ts — generic Express validation middleware.
//
// Each route that accepts a body or params defines a small "schema" object
// describing which fields are required and what type they must be. This
// middleware runs BEFORE the controller, so the controller can always
// assume req.body / req.params are well-formed. This satisfies I.1's
// requirement that "all requests should be tested against an appropriate
// validation middleware and schema."
//
// This is intentionally a lightweight hand-rolled validator rather than a
// third-party library, since our validation needs are simple (required
// fields + basic type checks).

import { Request, Response, NextFunction } from 'express';

type FieldType = 'string' | 'number';

export interface FieldSchema {
  type: FieldType;
  required?: boolean;
  min?: number; // for strings: min length; for numbers: min value
  max?: number; // for strings: max length; for numbers: max value
}

export type Schema = Record<string, FieldSchema>;

/**
 * Returns Express middleware that validates req.body against the given schema.
 * On failure, responds with 400 and a map of field -> error message.
 * On success, calls next() so the controller can proceed.
 */
export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string> = {};
    const body = req.body ?? {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = body[field];

      if (rules.required && (value === undefined || value === null || value === '')) {
        errors[field] = `${field} is required.`;
        continue;
      }

      if (value === undefined || value === null) continue; // optional and absent

      if (rules.type === 'string') {
        if (typeof value !== 'string') {
          errors[field] = `${field} must be a string.`;
          continue;
        }
        if (rules.min !== undefined && value.trim().length < rules.min) {
          errors[field] = `${field} must be at least ${rules.min} characters.`;
        }
        if (rules.max !== undefined && value.trim().length > rules.max) {
          errors[field] = `${field} must be at most ${rules.max} characters.`;
        }
      }

      if (rules.type === 'number') {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          errors[field] = `${field} must be a number.`;
          continue;
        }
        if (rules.min !== undefined && value < rules.min) {
          errors[field] = `${field} must be at least ${rules.min}.`;
        }
        if (rules.max !== undefined && value > rules.max) {
          errors[field] = `${field} must be at most ${rules.max}.`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  };
};

/**
 * Validates that req.params[paramName] is a positive integer.
 * Used for routes like /movies/:movieId/watchlist.
 */
export const validateIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const raw = req.params[paramName];
    const id = Number(raw);

    if (!raw || Number.isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      res.status(400).json({ errors: { [paramName]: `${paramName} must be a positive integer.` } });
      return;
    }

    next();
  };
};
