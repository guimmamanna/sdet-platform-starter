import type { NextFunction, Request, Response } from 'express';

import { demoStore } from '../data/store.js';

export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  const username = demoStore.authenticate(request.header('authorization'));
  request.user = { username };
  next();
}

