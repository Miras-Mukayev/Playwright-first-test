
import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Wait until products are displayed.
    await this.page.locator('[data-test^="product-"]').first().waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  async buyProduct() {
    // Select an available product.
    const productCard = this.page
      .locator('a[href^="/product/"]')
      .filter({ hasText: 'Bolt Cutters' })
      .first();

    await expect(productCard).toBeVisible();
    await expect(productCard).not.toContainText('Out of stock');

    await productCard.click();

    // Add the product to the cart.
    const addToCartButton = this.page.locator('[data-test="add-to-cart"]');

    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();

    // Open cart and start checkout.
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.page.locator('[data-test="proceed-1"]').click();

    // Log in to the existing test account.
    await this.page.locator('[data-test="email"]').fill(
      'customer@practicesoftwaretesting.com'
    );
    await this.page.locator('[data-test="password"]').fill('welcome01');
    await this.page.locator('[data-test="login-submit"]').click();

    // Verify successful login and continue to billing address.
    const proceedToAddress = this.page.locator('[data-test="proceed-2"]');

    await expect(proceedToAddress).toBeVisible({ timeout: 10000 });
    await proceedToAddress.click();

    // Fill in billing address.
    const country = this.page.locator('[data-test="country"]');

    await expect(country).toBeVisible();
    await country.selectOption({ label: 'Kazakhstan' });

    await this.page.locator('[data-test="postal_code"]').fill('050010');
    await this.page.locator('[data-test="house_number"]').fill('42');

    await this.page.locator('input[placeholder="Your Street *"]').fill(
      'Abay Street'
    );
    await this.page.locator('input[placeholder="Your City *"]').fill(
      'Almaty'
    );
    await this.page.locator('input[placeholder="State *"]').fill(
      'Almaty'
    );

    // Continue to payment.
    const proceedToPayment = this.page.locator('[data-test="proceed-3"]');

    await expect(proceedToPayment).toBeEnabled({ timeout: 10000 });
    await proceedToPayment.click();

    // Select bank transfer and enter payment details.
    await this.page.locator('[data-test="payment-method"]').selectOption(
      'bank-transfer'
    );

    await this.page.locator('[data-test="bank_name"]').fill('Test Bank');
    await this.page.locator('[data-test="account_name"]').fill(
      'Test Customer'
    );
    await this.page.locator('[data-test="account_number"]').fill('144526');

    // Finish payment.
    await this.page.locator('[data-test="finish"]').click();

    await expect(this.page.locator('body')).toContainText(
      'Payment was successful',
      { timeout: 15000 }
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
