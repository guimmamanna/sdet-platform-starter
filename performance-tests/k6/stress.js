import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.APP_BASE_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 15 },
    { duration: '1m', target: 25 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1200'],
  },
};

export default function () {
  const response = http.get(`${baseUrl}/health`);

  check(response, {
    'health check remains responsive': (result) => result.status === 200,
  });

  sleep(1);
}

