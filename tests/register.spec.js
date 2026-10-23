
import { test } from '../fixtures/test-fixtures.js';

test('A new customer can register', async ({ registerPage }) => {
  const customer = {
    firstName: 'Test',
    lastName: 'Customer',
    email: `test.customer.${Date.now()}@example.com`,
    password: 'TestPassword123!',
  };

  await registerPage.open();
  await registerPage.register(customer);
  await registerPage.expectRegistrationResult();
});
