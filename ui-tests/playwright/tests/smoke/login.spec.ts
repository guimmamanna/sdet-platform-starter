import { env } from '../../helpers/env';
import { expect, test } from '../../fixtures/test-fixtures';

test.describe('authentication smoke coverage', () => {
  test('@smoke @ui seeded user can sign in and view inventory', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);

    await inventoryPage.expectLoaded();
    await expect(inventoryPage.resultCount).toContainText('3 item(s)');
    await inventoryPage.expectItemVisible('Laptop stand');
  });

  test('@smoke @ui invalid credentials surface a user-facing error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'wrong-password');

    await loginPage.expectMessage('Invalid username or password');
  });
});

