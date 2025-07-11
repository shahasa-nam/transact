export class lumpsumstp {
  constructor(page) {
    this.page = page;
  }

  async fillStpDetails(type, stpName, frequency, date, install, stpamount) {
    const { page } = this;

    // Select Destination Scheme Type
    const stpSchemeType = page.locator('ng-select').filter({ hasText: 'Destination Scheme Type' });
    await stpSchemeType.click();
    await page.getByRole('option', { name: type }).click();

    // Select Destination Scheme Name
    await page.locator('ng-select').filter({ hasText: 'Destination Scheme Name' }).getByRole('textbox').click();
    await page.getByRole('option', { name: stpName }).click();

    // Select Frequency
    const freqDropdown = page.locator('ng-select').filter({ hasText: 'Select Frequency' });
    await freqDropdown.click();
    await page.getByRole('option', { name: frequency }).click();

    // Frequency-specific handling
    switch (frequency) {
      case 'Monthly':
        const stpDateMonthly = page.locator('ng-select').filter({ hasText: 'Select Day' });
        await stpDateMonthly.click();
        await page.getByRole('option', { name: date, exact: true }).click();
        break;

      case 'Daily':
        await page.locator('app-date-picker').getByRole('button').click();
        break;

      case 'Weekly':
        await page.locator('ng-select').filter({ hasText: 'Select STP Day' }).getByRole('combobox').click();
        await page.getByRole('option', { name: 'Tuesday' }).click(); // You can parameterize this if needed
        break;

      case 'Quarterly':
        await page.getByText('Select Quarter').click();
        await page.getByRole('option', { name: '1st Month in the Quarter' }).click();
        await page.locator('ng-select').filter({ hasText: 'Select STP Day' }).getByRole('textbox').click();
        await page.getByRole('option', { name: '2', exact: true }).click();
        break;

      default:
        throw new Error(`Unsupported frequency: ${frequency}`);
    }

    // Fill Installments
    await page.getByPlaceholder('Enter no. of installments').click();
    await page.getByPlaceholder('Enter no. of installments').fill(install);

    // Fill STP Amount
    await page.getByPlaceholder('Enter STP Amount').click();
    await page.getByPlaceholder('Enter STP Amount').fill(stpamount);
  }
}
