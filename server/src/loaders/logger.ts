import morgan, { type TokenIndexer } from 'morgan';
import type { Request, Response } from 'express';

const jsonFormat = (tokens: TokenIndexer<Request, Response>, req: Request, res: Response): string => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time_ms: Number(tokens['response-time'](req, res)),
    timestamp: new Date().toISOString()
  });
};

export const morganLogger = morgan(jsonFormat);