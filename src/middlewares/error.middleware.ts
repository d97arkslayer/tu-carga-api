import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

// Middleware de manejo de errores
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err); // Log interno para depuración
  res.status(500).json({ message: 'Internal Server Error' });
};
