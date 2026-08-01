// middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express';
import type { IAuthAdapter } from '../../interfaces/IAuthAdapter.ts';

export const createAuthMiddleware = (auth: IAuthAdapter) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const payload = await auth.verifyToken(token);

    if (!payload) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }

    res.locals.user = payload;
    next();
  };
};