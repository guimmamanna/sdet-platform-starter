import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly messageBanner: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByTestId('login-username');
    this.passwordInput = this.page.getByTestId('login-password');
    this.submitButton = this.page.getByTestId('login-submit');
    this.messageBanner = this.page.getByTestId('toast-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectMessage(message: string | RegExp): Promise<void> {
    await expect(this.messageBanner).toContainText(message);
  }
}
