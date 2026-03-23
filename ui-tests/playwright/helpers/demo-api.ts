import { expect, type APIRequestContext } from '@playwright/test';

import { env } from './env';

export async function resetDemoState(request: APIRequestContext, state = 'default'): Promise<void> {
  const response = await request.post(`${env.apiBaseUrl}/test/reset`, {
    data: { state },
  });

  expect(response.ok()).toBeTruthy();
}

