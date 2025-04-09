// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '@utils/jwt.utils';
import { CustomError } from '@utils/CustomError';
import User from '@models/User';

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findByPk(decoded?.userId);

    if (!user) {
      // @ts-ignore
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError('Invalid or expired token', 401));
  }
};
