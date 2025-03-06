// src/utils/jwt.utils.ts
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface TokenPayload {
  userId: number;
  email: string;
  purpose?: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwtSecret) as TokenPayload;
};
