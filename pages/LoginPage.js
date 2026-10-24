
import { expect } from '@playwright/test';


export class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async open() { // Opening the sign in page
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.locator('[data-test="nav-sign-in"]').click();
  }

  async login(email, password) { // Filling the login details
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-submit"]').click();
  }

  async expectLoginSuccessful() {
  await expect(this.page).not.toHaveURL(/\/auth\/login/);

  await expect(
    this.page.locator('[data-test="nav-sign-in"]')
  ).toHaveCount(0, { timeout: 10000 });
}
}
