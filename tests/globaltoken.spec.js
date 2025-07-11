import { test } from '@playwright/test';
const fs = require('fs');


test('Login and save storage', async ({ page }) => {
  await page.goto('https://kuberkbh.mfdevops.com/');
  await page.getByRole('button', { name: 'LOGIN/REGISTER' }).click();
  await page.locator('#ion-input-1').fill('321739_KOTAK');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByPlaceholder('Enter OTP').fill('507011');

  await page.waitForURL('**/distributor/dashboard');

  // Save session storage
  await page.context().storageState({ path: 'auth-storage.json' });
});