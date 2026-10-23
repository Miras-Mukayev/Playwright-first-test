
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CompareProductsPage } from '../pages/CompareProductsPage.js';
import { PasswordResetPage } from '../pages/PasswordResetPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  compareProductsPage: async ({ page }, use) => {
    await use(new CompareProductsPage(page));
  },

  passwordResetPage: async ({ page }, use) => {
    await use(new PasswordResetPage(page));
  },  
});

export { expect } from '@playwright/test';
