
import { test } from '../fixtures/test-fixtures.js';

test('Customer can log in with valid credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(
    'customer2@practicesoftwaretesting.com',
    'welcome01'
  );
  await loginPage.expectLoginSuccessful();
});