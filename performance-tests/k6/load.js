import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.APP_BASE_URL || 'http://localhost:3000';
const username = __ENV.DEMO_USERNAME || 'standard_user';
const password = __ENV.DEMO_PASSWORD || 'Password123!';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<800'],
  },
};

export function setup() {
  const response = http.post(
    `${baseUrl}/api/auth/login`,
    JSON.stringify({ username, password }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  check(response, {
    'login succeeds during setup': (result) => result.status === 200,
  });

  return { token: response.json('token') };
}

export default function (data) {
  const response = http.get(`${baseUrl}/api/items`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  check(response, {
    'inventory request returns 200': (result) => result.status === 200,
    'inventory payload contains seeded items': (result) => result.json('count') >= 3,
  });

  sleep(1);
}

