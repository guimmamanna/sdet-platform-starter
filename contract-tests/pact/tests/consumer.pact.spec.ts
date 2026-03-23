import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { MatchersV3, PactV3 } from '@pact-foundation/pact';

import { DemoConsumerClient } from '../src/demoConsumerClient';

const { eachLike, like, regex } = MatchersV3;

test('consumer publishes a contract for inventory search', async () => {
  const provider = new PactV3({
    consumer: 'portfolio-ui',
    provider: 'sample-app-provider',
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'warn',
  });

  provider
    .given('inventory has matching items')
    .uponReceiving('a request for matching inventory items')
    .withRequest({
      method: 'GET',
      path: '/api/items',
      query: { q: 'provider' },
      headers: {
        Authorization: regex('^Bearer .*$', 'Bearer test-token'),
      },
    })
    .willRespondWith({
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: {
        count: like(1),
        items: eachLike(
          {
            id: like('item-123'),
            title: like('Provider contract item'),
            description: like('Generated for Pact provider verification.'),
            owner: like('standard_user'),
            status: like('active'),
            tags: eachLike('contract', 1),
            createdAt: like('2026-01-01T00:00:00.000Z'),
            updatedAt: like('2026-01-01T00:00:00.000Z'),
          },
          1,
        ),
      },
    });

  await provider.executeTest(async (mockServer) => {
    const client = new DemoConsumerClient(mockServer.url, 'test-token');
    const payload = await client.listItems('provider');

    assert.equal(payload.count, 1);
    assert.equal(payload.items[0]?.title, 'Provider contract item');
  });
});
