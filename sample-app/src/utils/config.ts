export const config = {
  port: Number(process.env.APP_PORT ?? process.env.PORT ?? '3000'),
  demoUser: {
    username: process.env.DEMO_USERNAME ?? 'standard_user',
    password: process.env.DEMO_PASSWORD ?? 'Password123!',
    displayName: process.env.DEMO_DISPLAY_NAME ?? 'Standard User',
  },
  allowTestReset: (process.env.ALLOW_TEST_RESET ?? 'true').toLowerCase() === 'true',
};

