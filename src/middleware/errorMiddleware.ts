import { NextFunction, Response, Request } from 'express';
import ResponseError from '../error/responseError';
import { ZodError } from 'zod';

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      errors: JSON.stringify(err),
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
