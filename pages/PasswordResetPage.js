
import { expect } from '@playwright/test';

export class PasswordResetPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.locator('[data-test="nav-sign-in"]').click();
    await this.page.locator('[data-test="forgot-password-link"]').click();
  }

  async requestPasswordReset(email) {
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="forgot-password-submit"]').click();
  }

  async expectResetConfirmation() {
    await expect(
      this.page.getByText('page.forgot-password.confirm')
    ).toBeVisible();
  }
}
