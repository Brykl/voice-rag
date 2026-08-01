
import express, { type Express, type Request, type Response } from 'express';
import { morganLogger } from './loaders/logger';
import { config } from './config';


async function startServer() {
  const app: Express = express();

  app.use(morganLogger)


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