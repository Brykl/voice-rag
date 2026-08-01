import { Router, type Request, type Response } from 'express';
import type { RequestHandler } from 'express';

const route = Router();

export default (app: Router, authMiddleware: RequestHandler) => {
  app.use('/users', route);

  route.get('/me', authMiddleware, (req: Request, res: Response) => {
    return res.json({ user: res.locals.user });
  });
};