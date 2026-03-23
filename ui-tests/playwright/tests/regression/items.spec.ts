import { test } from '../../fixtures/test-fixtures';

test.describe('inventory regression coverage', () => {
  test('@regression @ui user can add, search, edit, and delete an item', async ({
    authenticatedInventory,
  }) => {
    const createdTitle = `Playwright item ${Date.now()}`;
    const updatedTitle = `${createdTitle} updated`;

    await authenticatedInventory.addItem(
      createdTitle,
      'Created through the flagship Playwright regression workflow.',
    );
    await authenticatedInventory.expectToast('Item created successfully.');

    await authenticatedInventory.search(createdTitle);
    await authenticatedInventory.expectItemVisible(createdTitle);

    await authenticatedInventory.editItem(
      createdTitle,
      updatedTitle,
      'Edited through the Playwright page object flow.',
    );
    await authenticatedInventory.expectToast('Item updated successfully.');

    await authenticatedInventory.search(updatedTitle);
    await authenticatedInventory.expectItemVisible(updatedTitle);

    await authenticatedInventory.deleteItem(updatedTitle);
    await authenticatedInventory.expectToast('Item deleted successfully.');

    await authenticatedInventory.search(updatedTitle);
    await authenticatedInventory.expectEmptyState();
  });

  test('@regression @ui duplicate titles are rejected cleanly', async ({ authenticatedInventory }) => {
    await authenticatedInventory.addItem(
      'Laptop stand',
      'Attempting to create a known duplicate should fail deterministically.',
    );

    await authenticatedInventory.expectToast('already exists');
  });
});

