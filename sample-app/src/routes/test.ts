import { Router } from 'express';
import { z } from 'zod';

import { demoStore } from '../data/store.js';
import { ApiError } from '../middleware/errorHandler.js';
import { config } from '../utils/config.js';

const resetSchema = z.object({
  state: z.string().optional(),
});

export const testRouter = Router();

testRouter.use((_request, _response, next) => {
  if (!config.allowTestReset) {
    next(new ApiError(403, 'Test reset endpoints are disabled'));
    return;
  }

  next();
});

testRouter.post('/reset', (request, response, next) => {
  try {
    const parsed = resetSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Reset payload is invalid', parsed.error.flatten());
    }

    const items = demoStore.applyProviderState(parsed.data.state ?? 'default');

    response.status(200).json({
      message: 'Demo state reset successfully',
      count: items.length,
    });
  } catch (error) {
    next(error);
  }
});

testRouter.post('/provider-state', (request, response, next) => {
  try {
    const parsed = resetSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Provider state payload is invalid', parsed.error.flatten());
    }

    const items = demoStore.applyProviderState(parsed.data.state);

    response.status(200).json({
      message: 'Provider state applied',
      count: items.length,
    });
  } catch (error) {
    next(error);
  }
});

