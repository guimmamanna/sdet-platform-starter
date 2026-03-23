import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(currentDirectory, '../../.env') });

const appBaseUrl = process.env.APP_BASE_URL ?? 'http://localhost:3000';
const shouldStartWebServer = process.env.PW_DISABLE_WEBSERVER !== 'true';
const sampleAppDirectory = path.resolve(currentDirectory, '../../sample-app');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 2 : 1,
  workers: Number(process.env.PLAYWRIGHT_WORKERS ?? (process.env.CI ? '2' : '4')),
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/playwright-junit.xml' }],
  ],
  use: {
    baseURL: appBaseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 960 },
    actionTimeout: 8_000,
  },
  webServer: shouldStartWebServer
    ? {
        command: `npm --prefix ${sampleAppDirectory} run dev`,
        url: `${appBaseUrl}/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
