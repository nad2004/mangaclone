// utils/jwt.ts
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { cookieOptAccess, cookieOptRefresh } from '../config/cookies';
const SECRET_KEY = process.env.JWT_SECRET || ''

export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}
export function setTokenCookie(res: Response, token: string) {
  res.cookie('token', token, {
    ...cookieOptAccess,
  });
}
export function clearTokenCookie(res: Response) {
  res.clearCookie('token', { ...cookieOptAccess });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, { ...cookieOptRefresh});
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie('refreshToken', { ...cookieOptRefresh });
}




