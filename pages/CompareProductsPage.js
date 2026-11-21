
import { expect } from '@playwright/test';

export class CompareProductsPage {
  constructor(page) {
    this.page = page;

    this.firstProduct = 'Claw Hammer';
    this.secondProduct = 'Thor Hammer';

    this.addToCompareButton = '[data-test="add-to-compare"]';
    this.compareLink = '[data-test="compare-link"]';
    this.showDifferences = '[data-test="show-differences"]';
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Wait until at least one product is displayed.
    await this.page.locator('[data-test^="product-"]').first().waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }


async addProductToComparison(productName) {
  const product = this.page
    .locator('a[href^="/product/"]')
    .filter({
      has: this.page.getByRole('heading', {
        name: productName,
        exact: true,
      }),
    });

  await expect(product).toHaveCount(1);

  const compareButton = product.getByRole('button', {
    name: 'Compare',
    exact: true,
  });

  await expect(compareButton).toBeVisible();
  await compareButton.click();
}



  async compareTwoProducts() {
    // Add the first product.
    await this.addProductToComparison(this.firstProduct);

    // Return to the homepage.
    await this.open();

    // Add the second product.
    await this.addProductToComparison(this.secondProduct);

    // Open the comparison page.
    const comparisonLink = this.page.locator(this.compareLink);

    await expect(comparisonLink).toBeVisible();
    await comparisonLink.click();
  }

  async expectBothProductsVisible() {
    await expect(this.page.locator('body')).toContainText('Claw Hammer');
    await expect(this.page.locator('body')).toContainText('Thor Hammer');
  }

  async testDifferencesFilter() {
    const differencesCheckbox = this.page.locator(this.showDifferences);

    await expect(differencesCheckbox).toBeVisible();

    await differencesCheckbox.check();
    await expect(differencesCheckbox).toBeChecked();

    await differencesCheckbox.uncheck();
    await expect(differencesCheckbox).not.toBeChecked();
  }
}
