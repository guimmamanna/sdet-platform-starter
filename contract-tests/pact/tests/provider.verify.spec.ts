import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { Verifier } from '@pact-foundation/pact';

const appBaseUrl = process.env.APP_BASE_URL ?? 'http://localhost:3000';

async function applyProviderState(state: string): Promise<void> {
  const response = await fetch(`${appBaseUrl}/api/test/provider-state`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state }),
  });

  if (!response.ok) {
    throw new Error(`Provider state setup failed with ${response.status}`);
  }
}

test('sample app provider satisfies the generated consumer contract', async () => {
  const pactFile = path.resolve(process.cwd(), 'pacts', 'portfolio-ui-sample-app-provider.json');

  const output = await new Verifier({
    provider: 'sample-app-provider',
    providerBaseUrl: appBaseUrl,
    pactUrls: [pactFile],
    logLevel: 'warn',
    stateHandlers: {
      'inventory has matching items': async () => {
        await applyProviderState('inventory has matching items');
      },
    },
    requestFilter: (
      requestOptions: { headers?: Record<string, string> },
      _response: unknown,
      next: () => void,
    ) => {
      requestOptions.headers = {
        ...requestOptions.headers,
        authorization: 'Bearer test-token',
      };
      next();
    },
  }).verifyProvider();

  assert.ok(output.length > 0);
});
