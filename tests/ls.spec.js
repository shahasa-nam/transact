import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth-storage.json' });

test.describe.serial('Lumpsum Transaction Flow', () => {
  const investorName = 'namrata hemant shahasane';
  const schemeType = 'Equity';
  const schemeName = 'Kotak Bluechip Fund - Regular Plan - Growth';
  const amount = '100';

  test('IFA user performs lumpsum transaction successfully', async ({ page }) => {
    await page.goto('https://kuberkbh.mfdevops.com/distributor/dashboard');

    await test.step('Verify dashboard is visible', async () => {
      await expect(page).toHaveURL(/distributor\/dashboard/);
    });

    await test.step('Navigate to Lumpsum transaction form', async () => {
      await page.locator('#lg-sidebar').getByText('Transaction', { exact: true }).click();
      await page.locator('#lg-sidebar div').filter({ hasText: /^Initiate Transaction$/ }).click();
      await page.getByText('Existing Investor').click();
      await page.locator('div').filter({ hasText: /^Lumpsum$/ }).nth(1).click();
    });

    await test.step('Search and select investor', async () => {
      await page.waitForURL('**/distributor/transact/investor-list');
      const investorSearch = page.getByRole('textbox', { name: 'Search by Investor Name' });
      await investorSearch.click();
      await investorSearch.fill('namrata');

      const investorOption = page.locator('ion-text', { hasText: investorName }).first();
      await expect(investorOption).toBeVisible({ timeout: 5000 });
      await investorOption.click();
    });

    await test.step('Verify Lumpsum form loaded', async () => {
      await page.waitForURL('**/distributor/transact/lumpsum');
    });

    await test.step('Fill transaction details', async () => {
      //for scheme type
      const schemeTypeDropdown = page.locator('ng-select').filter({ hasText: 'Select Scheme Type××' });
      await schemeTypeDropdown.click();
      await page.getByRole('option', { name: schemeType}).click();
    
      //for scheme name
      const schemeNameDropdown = page.locator('ng-select').filter({ hasText: 'Select Scheme Name××' });
      await schemeNameDropdown.click();
      await page.getByText(schemeName, { exact: true }).click();

      const amountField = page.getByPlaceholder('Enter Amount');
      await amountField.fill(amount);

      await page.getByRole('radio', { name: 'None' }).click();
    });

    await test.step('Submit transaction', async () => {
      await page.getByRole('button', { name: 'Proceed' }).click();
      await page.getByRole('button', { name: 'Select Payment Mode' }).click();

      const paymentOption = page.getByLabel('payment option').nth(1);
      await expect(paymentOption).toBeVisible();
      await paymentOption.click();

      await page.getByRole('button', { name: 'CONTINUE' }).click();

      const bankDropdown = page.getByRole('combobox');
      await bankDropdown.click();
      await page.getByRole('option', { name: /Bank of Maharashtra/ }).click();
    });
await test.step('Submit transaction', async () => {
  const submitButton = page.getByRole('button', { name: 'Submit & Review' });
  await expect(submitButton).toBeVisible({ timeout: 5000 });
  await submitButton.click();
});

  
await test.step('Trigger Link', async () => {
  const triggerLinkButton = page.getByRole('button', { name: 'Trigger Link' });

  // Scroll into view
  await triggerLinkButton.scrollIntoViewIfNeeded();

  // Confirm it's visible
  await expect(triggerLinkButton).toBeVisible({ timeout: 5000 });

  // Click + wait for navigation
  await page.waitForURL('**/distributor/transact/summary', { timeout: 10000 }),
    triggerLinkButton.click()
  

  console.log('✅ Trigger Link button clicked and navigated');
});



await test.step('Return to dashboard', async () => {

  const backToHomeButton = page.getByRole('button', { name: 'Back to home' });
  await expect(backToHomeButton).toBeVisible({ timeout: 5000 });
  await backToHomeButton.click();
  // await page.waitForURL('**/distributor/dashboard');
  // await expect(page).toHaveURL(/distributor\/dashboard/, { timeout: 10000 });
});

});
  });





