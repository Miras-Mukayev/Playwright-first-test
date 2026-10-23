
import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async buyProduct() {
    // Select a product and add it to the cart.
    await this.page
      .locator('[data-test="product-01M5MV9TJAEARH5AKSV9ZHHHW1"]')
      .click();

    await this.page.locator('[data-test="add-to-cart"]').click();

    // Open the cart and proceed to checkout.
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.page.locator('[data-test="proceed-1"]').click();

    // Log in to the existing test account.
    await this.page.locator('[data-test="email"]').fill(
      'customer2@practicesoftwaretesting.com'
    );
    await this.page.locator('[data-test="password"]').fill('welcome01');
    await this.page.locator('[data-test="login-submit"]').click();

    // Continue to the address step.
    await this.page.locator('[data-test="proceed-2"]').click();

    
    await this.page.locator('[data-test="country"]').selectOption('KZ');
    await this.page.locator('[data-test="postal_code"]').fill('050010');
    await this.page.locator('[data-test="house_number"]').fill('42');

    // Fill the required address fields.
    await this.page.locator('input[placeholder="Your Street *"]').fill('Abay Street');
    await this.page.locator('input[placeholder="Your City *"]').fill('Almaty');
    await this.page.locator('input[placeholder="State *"]').fill('Almaty');

    await expect(
    this.page.locator('[data-test="proceed-3"]')
    ).toBeEnabled();

    await this.page.locator('[data-test="proceed-3"]').click();


    // Select bank transfer and complete its payment details.
    await this.page
      .locator('[data-test="payment-method"]')
      .selectOption('bank-transfer');

    await this.page.locator('[data-test="bank_name"]').fill('Test Bank');
    await this.page.locator('[data-test="account_name"]').fill('Test Customer');
    await this.page.locator('[data-test="account_number"]').fill('144526');

    await this.page.locator('[data-test="finish"]').click();

    // The payment step displays a successful payment message.
    await expect(this.page.locator('body')).toContainText(
    'Payment was successful'
    );

    // Confirm the order.
    await this.page.getByText('Confirm', { exact: true }).click();
    }

  async expectOrderConfirmation() {
    await expect(this.page.locator('body')).toContainText(
        /order confirmation|order number|thank you|success/i,
        { timeout: 10000 }
    );
  }
}
    