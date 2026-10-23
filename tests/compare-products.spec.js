
import { test } from '../fixtures/test-fixtures.js';

test('A customer can compare two products', async ({
  compareProductsPage,
}) => {
  await compareProductsPage.open();
  await compareProductsPage.compareTwoProducts();
  await compareProductsPage.expectBothProductsVisible();
  await compareProductsPage.testDifferencesFilter();
});
