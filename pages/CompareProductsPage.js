
import { expect } from '@playwright/test';

export class CompareProductsPage {
  constructor(page) {
    this.page = page;

    this.firstProduct =
      '[data-test="product-01M5QH4EAVP48YW93XJDG173E3"]';
    this.secondProduct =
      '[data-test="product-01M5QH4EAY7BV54DNBFCTQ4BF9"]';

    this.addToCompareButton = '[data-test="add-to-compare"]';
    this.compareLink = '[data-test="compare-link"]';
    this.showDifferences = '[data-test="show-differences"]';
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await this.page
      .locator(this.firstProduct)
      .waitFor({ state: 'visible', timeout: 15000 });
  }

  async addProductToComparison(productSelector) {
    await this.page.locator(productSelector).click();
    await this.page.locator(this.addToCompareButton).click();
  }

  async compareTwoProducts() {
    await this.addProductToComparison(this.firstProduct);

    await this.open();

    await this.addProductToComparison(this.secondProduct);

    await this.page.locator(this.compareLink).click();
  }

  async expectBothProductsVisible() {
    await expect(this.page.locator('body')).toContainText('Claw Hammer');
    await expect(this.page.locator('body')).toContainText('Thor Hammer');
  }

  async testDifferencesFilter() {
    await expect(this.page.locator(this.showDifferences)).toBeVisible();

    await this.page.locator(this.showDifferences).check();
    await expect(this.page.locator(this.showDifferences)).toBeChecked();

    await this.page.locator(this.showDifferences).uncheck();
    await expect(this.page.locator(this.showDifferences)).not.toBeChecked();
  }
}
