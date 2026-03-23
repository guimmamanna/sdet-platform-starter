import { test as base } from '@playwright/test';

import { resetDemoState } from '../helpers/demo-api';
import { env } from '../helpers/env';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

type UiFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedInventory: InventoryPage;
  resetAppState: void;
};

export const test = base.extend<UiFixtures>({
  resetAppState: [
    async ({ request }, use) => {
      await resetDemoState(request);
      await use();
    },
    { auto: true },
  ],
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  authenticatedInventory: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';

