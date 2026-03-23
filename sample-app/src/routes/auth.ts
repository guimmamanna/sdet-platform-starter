import { Router } from 'express';
import { z } from 'zod';

import { demoStore } from '../data/store.js';
import { ApiError } from '../middleware/errorHandler.js';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post('/login', (request, response, next) => {
  try {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Login payload is invalid', parsed.error.flatten());
    }

    const result = demoStore.login(parsed.data.username, parsed.data.password);

    response.status(200).json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
});

