import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { authRouter } from './routes/auth.js';
import { itemsRouter } from './routes/items.js';
import { testRouter } from './routes/test.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(currentDirectory, '../public');

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static(publicDirectory));

  app.get('/health', (_request, response) => {
    response.status(200).json({
      status: 'ok',
      service: 'sample-app',
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/test', testRouter);
  app.use('/api', itemsRouter);

  app.get('/', (_request, response) => {
    response.sendFile(path.join(publicDirectory, 'index.html'));
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
