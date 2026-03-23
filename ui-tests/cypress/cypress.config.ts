import { defineConfig } from 'cypress';
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';

export default defineConfig({
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports/cypress',
    overwrite: false,
    html: true,
    json: true,
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  env: {
    apiUrl: process.env.API_BASE_URL ?? 'http://localhost:3000/api',
    username: process.env.DEMO_USERNAME ?? 'standard_user',
    password: process.env.DEMO_PASSWORD ?? 'Password123!',
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL ?? process.env.APP_BASE_URL ?? 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
  },
});

