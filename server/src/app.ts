import express, { type Express, type Request, type Response } from 'express';
import { morganLogger } from './loaders/logger';



const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || 'localhost';


const protocol: string = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const URL: string = `${protocol}://${HOST}:${PORT}`;



async function startServer() {
  const app: Express = express();

  app.use(morganLogger)


  app.listen(PORT, () => {
    console.log(`
      ################################################
            Server running on: ${URL}
      ################################################`);
  }).on('error', (err: Error) => {
    console.error('Error starting server:', err);
    process.exit(1);
  }); 
}

startServer()