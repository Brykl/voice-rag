
import express, { type Express, type Request, type Response } from 'express';
import type { IAuthAdapter } from './interfaces/IAuthAdapter.js';
import { createAuthMiddleware } from './middlewares/authMiddleware.js';
import { morganLogger } from './loaders/logger.js';
import { config } from './config/index.js';


async function startServer() {

  let authAdapter: IAuthAdapter; 

  switch (config.authAdapter) {
    case 'firebase':
      const { FirebaseAuthAdapter } = await import('./adapters/FirebaseAuthAdapter.js');
      authAdapter = new FirebaseAuthAdapter();
      break;
      
    default:
      console.error(`Unsupported auth adapter: ${config.authAdapter}`);
      process.exit(1);
  }


  const app: Express = express();

  app.use(morganLogger);


  const authMiddleware = createAuthMiddleware(authAdapter);


  app.listen(config.port, () => {
    console.log(`
      ################################################
            Server running on: ${config.url}
      ################################################`);
  }).on('error', (err: Error) => {
    console.error('Error starting server:', err);
    process.exit(1);
  }); 
}

startServer()