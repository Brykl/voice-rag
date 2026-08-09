import {
  Router,
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express';
import { getWorkspacesByUserId } from '../../../../services/workspace/get.ts';
import { createWorkspace } from '../../../../services/workspace/create.ts';
import { getUserByFirebaseUid } from '../../../../services/user/get.ts';

const route = Router();

export default (app: Router, authMiddleware: RequestHandler) => {
  app.use('/workspaces', route);

  route.get('/', authMiddleware, async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserByFirebaseUid(res.locals.user.uid);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const workspaces = await getWorkspacesByUserId(user.id);
      return res.json({ workspaces });
    } catch (error) {
      next(error);
    }
  });

  route.post('/', authMiddleware, async (
    req: Request<{}, {}, CreateWorkspaceBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const name = req.body?.name?.trim();

      if (!name) {
        return res.status(400).json({ error: 'Workspace name is required' });
      }

      const user = await getUserByFirebaseUid(res.locals.user.uid);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const workspace = await createWorkspace({
        name,
        userId: user.id,
      });
      return res.status(201).json({ workspace });
    } catch (error) {
      next(error);
    }
  });
};


type CreateWorkspaceBody = {
  name: string;
};
