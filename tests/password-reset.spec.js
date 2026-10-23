
import { test } from '../fixtures/test-fixtures.js';

test('A customer can request a password reset', async ({ passwordResetPage }) => {
  await passwordResetPage.open();

  await passwordResetPage.requestPasswordReset(
    'customer2@practicesoftwaretesting.com'
  );

  await passwordResetPage.expectResetConfirmation();
});
