import { randomUUID } from 'node:crypto';

import { ApiError } from '../middleware/errorHandler.js';
import type { DemoItem, DemoUser, ItemInput } from '../models/item.js';
import { config } from '../utils/config.js';

function nowIso(): string {
  return new Date().toISOString();
}

function buildSeedItems(): DemoItem[] {
  const timestamp = nowIso();

  return [
    {
      id: 'item-1001',
      title: 'Laptop stand',
      description: 'Portable aluminium stand used in the smoke suite.',
      owner: config.demoUser.username,
      status: 'active',
      tags: ['office', 'smoke'],
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: 'item-1002',
      title: 'Noise cancelling headset',
      description: 'Regression data for search and edit flows.',
      owner: config.demoUser.username,
      status: 'active',
      tags: ['audio', 'regression'],
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: 'item-1003',
      title: 'Portable monitor',
      description: 'Supports delete and error handling scenarios.',
      owner: config.demoUser.username,
      status: 'active',
      tags: ['travel'],
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];
}

class DemoStore {
  private items: DemoItem[] = [];
  private sessions = new Map<string, string>();
  private readonly demoUser: DemoUser = config.demoUser;

  constructor() {
    this.reset();
  }

  reset(): DemoItem[] {
    this.items = buildSeedItems();
    this.sessions.clear();
    return this.items;
  }

  login(username: string, password: string): { token: string; user: Omit<DemoUser, 'password'> } {
    if (username !== this.demoUser.username || password !== this.demoUser.password) {
      throw new ApiError(401, 'Invalid username or password');
    }

    const token = `token-${randomUUID()}`;
    this.sessions.set(token, username);

    return {
      token,
      user: {
        username: this.demoUser.username,
        displayName: this.demoUser.displayName,
      },
    };
  }

  authenticate(authorizationHeader?: string): string {
    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing or invalid authorization header');
    }

    const token = authorizationHeader.replace('Bearer ', '').trim();
    if (config.allowTestReset && token === 'test-token') {
      return this.demoUser.username;
    }

    const username = this.sessions.get(token);

    if (!username) {
      throw new ApiError(401, 'Session token is not recognized');
    }

    return username;
  }

  listItems(query?: string): DemoItem[] {
    if (!query) {
      return [...this.items];
    }

    const normalized = query.trim().toLowerCase();

    return this.items.filter((item) => {
      return item.title.toLowerCase().includes(normalized) || item.description.toLowerCase().includes(normalized);
    });
  }

  createItem(owner: string, input: ItemInput): DemoItem {
    const title = input.title.trim();
    const description = input.description.trim();

    if (this.items.some((item) => item.title.toLowerCase() === title.toLowerCase())) {
      throw new ApiError(409, `An item named "${title}" already exists`);
    }

    const timestamp = nowIso();
    const item: DemoItem = {
      id: `item-${randomUUID()}`,
      title,
      description,
      owner,
      status: 'active',
      tags: input.tags ?? ['general'],
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.items = [item, ...this.items];
    return item;
  }

  updateItem(id: string, input: ItemInput): DemoItem {
    const current = this.items.find((item) => item.id === id);

    if (!current) {
      throw new ApiError(404, `Item ${id} was not found`);
    }

    const nextTitle = input.title.trim();
    if (
      this.items.some((item) => item.id !== id && item.title.toLowerCase() === nextTitle.toLowerCase())
    ) {
      throw new ApiError(409, `An item named "${nextTitle}" already exists`);
    }

    const updatedItem: DemoItem = {
      ...current,
      title: nextTitle,
      description: input.description.trim(),
      tags: input.tags ?? current.tags,
      updatedAt: nowIso(),
    };

    this.items = this.items.map((item) => (item.id === id ? updatedItem : item));
    return updatedItem;
  }

  deleteItem(id: string): void {
    const currentCount = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);

    if (this.items.length === currentCount) {
      throw new ApiError(404, `Item ${id} was not found`);
    }
  }

  applyProviderState(state?: string): DemoItem[] {
    this.reset();

    switch (state) {
      case 'inventory has matching items':
        this.createItem(this.demoUser.username, {
          title: 'Provider contract item',
          description: 'Generated for Pact provider verification.',
          tags: ['contract'],
        });
        break;
      case 'inventory is empty':
        this.items = [];
        break;
      default:
        break;
    }

    return [...this.items];
  }
}

export const demoStore = new DemoStore();
