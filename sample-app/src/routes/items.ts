import { Router } from 'express';
import { z } from 'zod';

import { demoStore } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';

const itemSchema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(5).max(200),
  tags: z.array(z.string().min(2)).optional(),
});

export const itemsRouter = Router();

itemsRouter.use(requireAuth);

itemsRouter.get('/items', (request, response) => {
  const query = typeof request.query.q === 'string' ? request.query.q : undefined;
  const items = demoStore.listItems(query);

  response.status(200).json({
    count: items.length,
    items,
  });
});

itemsRouter.post('/items', (request, response, next) => {
  try {
    const parsed = itemSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Item payload is invalid', parsed.error.flatten());
    }

    const owner = request.user?.username ?? 'unknown';
    const item = demoStore.createItem(owner, parsed.data);

    response.status(201).json({
      item,
      message: 'Item created successfully',
    });
  } catch (error) {
    next(error);
  }
});

itemsRouter.put('/items/:id', (request, response, next) => {
  try {
    const parsed = itemSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Item payload is invalid', parsed.error.flatten());
    }

    const item = demoStore.updateItem(request.params.id, parsed.data);

    response.status(200).json({
      item,
      message: 'Item updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

itemsRouter.delete('/items/:id', (request, response, next) => {
  try {
    demoStore.deleteItem(request.params.id);

    response.status(200).json({
      message: 'Item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

