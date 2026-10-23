
import { test } from '../fixtures/test-fixtures.js';

test('A customer can purchase a product', async ({ productsPage }) => {
  await productsPage.open();
  await productsPage.buyProduct();
  await productsPage.expectOrderConfirmation();
});
