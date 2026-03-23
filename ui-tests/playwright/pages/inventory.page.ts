import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly workspace: Locator;
  readonly toast: Locator;
  readonly sessionUser: Locator;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchClear: Locator;
  readonly itemTitle: Locator;
  readonly itemDescription: Locator;
  readonly itemSubmit: Locator;
  readonly itemCancel: Locator;
  readonly itemList: Locator;
  readonly resultCount: Locator;
  readonly emptyState: Locator;

  constructor(private readonly page: Page) {
    this.workspace = this.page.getByTestId('inventory-workspace');
    this.toast = this.page.getByTestId('toast-message');
    this.sessionUser = this.page.getByTestId('session-user');
    this.searchInput = this.page.getByTestId('search-input');
    this.searchSubmit = this.page.getByTestId('search-submit');
    this.searchClear = this.page.getByTestId('search-clear');
    this.itemTitle = this.page.getByTestId('item-title');
    this.itemDescription = this.page.getByTestId('item-description');
    this.itemSubmit = this.page.getByTestId('item-submit');
    this.itemCancel = this.page.getByTestId('item-cancel');
    this.itemList = this.page.getByTestId('item-list');
    this.resultCount = this.page.getByTestId('result-count');
    this.emptyState = this.page.getByTestId('empty-state');
  }

  private itemCard(title: string): Locator {
    return this.page.locator('.item-card').filter({
      has: this.page.getByRole('heading', { name: title, exact: true }),
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.workspace).toBeVisible();
    await expect(this.sessionUser).toContainText('standard_user');
  }

  async expectToast(message: string | RegExp): Promise<void> {
    await expect(this.toast).toContainText(message);
  }

  async addItem(title: string, description: string): Promise<void> {
    await this.itemTitle.fill(title);
    await this.itemDescription.fill(description);
    await this.itemSubmit.click();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchSubmit.click();
  }

  async clearSearch(): Promise<void> {
    await this.searchClear.click();
  }

  async editItem(currentTitle: string, nextTitle: string, nextDescription: string): Promise<void> {
    const itemCard = this.itemCard(currentTitle);
    await itemCard.getByRole('button', { name: 'Edit' }).click();
    await this.itemTitle.fill(nextTitle);
    await this.itemDescription.fill(nextDescription);
    await this.itemSubmit.click();
  }

  async deleteItem(title: string): Promise<void> {
    const itemCard = this.itemCard(title);
    await itemCard.getByRole('button', { name: 'Delete' }).click();
  }

  async expectItemVisible(title: string): Promise<void> {
    await expect(this.itemCard(title)).toBeVisible();
  }

  async expectItemNotVisible(title: string): Promise<void> {
    await expect(this.itemCard(title)).toHaveCount(0);
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.emptyState).toBeVisible();
  }
}
