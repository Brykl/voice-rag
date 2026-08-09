import express, { type Router, type RequestHandler } from 'express';
import UserRoutes from './v1/users/index.js';
import WorkspaceRoutes from './v1/workspace/index.js';

export function registerRoutesV1(app: Router, authMiddleware: RequestHandler) {
  const v1Router = express.Router();       // 1. создаём router для v1
  UserRoutes(v1Router, authMiddleware);    // 2. регистрируем роуты на нём
  WorkspaceRoutes(v1Router, authMiddleware); // 2. регистрируем роуты на нём
  app.use('/v1', v1Router);               // 3. монтируем с префиксом /v1
}