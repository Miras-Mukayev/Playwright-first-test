
import { expect } from '@playwright/test';

export class CompareProductsPage {
  constructor(page) {
    this.page = page;
    this.firstProduct =
      '[data-test="product-01M5MYQXJTKE725R10TDNX4W6T"]';
    this.secondProduct =
      '[data-test="product-01M5MYQXJM3JSET06DCBWP77G1"]';
    this.addToCompareButton = '[data-test="add-to-compare"]';
    this.compareLink = '[data-test="compare-link"]';
    this.showDifferences = '[data-test="show-differences"]';
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });
}

  async addProductToComparison(productSelector) {
    await this.page.locator(productSelector).click();
    await this.page.locator(this.addToCompareButton).click();
  }

  async compareTwoProducts() {
    await this.addProductToComparison(this.firstProduct);
    await this.page.goto('https://practicesoftwaretesting.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });
    await this.addProductToComparison(this.secondProduct);
    await this.page.locator(this.compareLink).click();
  }

  async expectBothProductsVisible() {
    await expect(this.page.locator('body')).toContainText(
      'A dependable standard claw'
    );
    await expect(this.page.locator('body')).toContainText(
      'The legendary Thor Hammer'
    );
  }

  async testDifferencesFilter() {
    await this.page.locator(this.showDifferences).check();
    await expect(this.page.locator(this.showDifferences)).toBeChecked();

    await this.page.locator(this.showDifferences).uncheck();
    await expect(this.page.locator(this.showDifferences)).not.toBeChecked();
  }
}
