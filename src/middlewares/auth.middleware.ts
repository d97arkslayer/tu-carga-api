// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '@utils/jwt.utils';
import { CustomError } from '@utils/CustomError';

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError('Invalid or expired token', 401));
  }
};
