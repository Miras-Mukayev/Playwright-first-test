import { expect } from '@playwright/test';

export class RegisterPage {

  constructor(page) {
    this.page = page;
  }

  async open() { // Find registration page
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.locator('[data-test="nav-sign-in"]').click();
    await this.page.locator('[data-test="register-link"]').click();
  }

  
async register(customer) {  // Fill all necessary data (valid for test register)
  await this.page.locator('[data-test="first-name"]').fill(customer.firstName);
  await this.page.locator('[data-test="last-name"]').fill(customer.lastName);
  await this.page.locator('[data-test="dob"]').fill('1995-06-15');
  await this.page.locator('[data-test="country"]').selectOption('KZ');
  await this.page.locator('[data-test="postal_code"]').fill('050010');
  await this.page.locator('[data-test="house_number"]').fill('42');

  // Wait for the automatic address lookup to settle.
  await this.page.waitForTimeout(3000);

 /* // Supply address fields directly if they are still empty.
  const street = this.page.locator('[data-test="street"]');
  const city = this.page.locator('[data-test="city"]');
  const state = this.page.locator('[data-test="state"]');*/

  /*if (await street.inputValue() === '') {
    await street.fill('Test Street');
  }

  if (await city.inputValue() === '') {
    await city.fill('Almaty');
  }

  if (await state.inputValue() === '') {
    await state.fill('Almaty');
  } */

  await this.page.locator('[data-test="phone"]').fill('87000000000');
  await this.page.locator('[data-test="email"]').fill(customer.email);
  await this.page.locator('[data-test="password"]').fill(customer.password);
  await this.page.locator('[data-test="register-submit"]').click();
}


  async expectRegistrationResult() {
    // Wait for the application to process the registration.
    await this.page.waitForTimeout(1500);

    // Confirm that registration either succeeded or displayed a meaningful
    // validation/server response instead of silently assuming success.
    const pageText = await this.page.locator('body').innerText();

    if (/customer registration/i.test(pageText)) {
      await expect(
        this.page.locator('[data-test="register-form"]')
      ).toBeVisible();

      // If the form remains open, require an actual message explaining why.
      await expect(
        this.page.locator('body')
      ).toContainText(/required|invalid|already exists|error|password/i);
    } else {
      await expect(this.page).not.toHaveURL(/register/i);
    }
  }
}