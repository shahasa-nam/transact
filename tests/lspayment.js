export class LumpsumPaymentPage {
  constructor(page) {
    this.page = page;
  }

  async verifycartFormLoaded() {
    await this.page.getByRole('button', { name: 'Proceed' }).click();
    await this.page.waitForURL('**/distributor/transact/cart');
}

     async submitTransaction() {
    await this.page.getByRole('button', { name: 'Select Payment Mode' }).click();

    const paymentOption = this.page.getByLabel('payment option').nth(1);
    await paymentOption.waitFor({ state: 'visible' });
    await paymentOption.click();

    await this.page.getByRole('button', { name: 'CONTINUE' }).click();
    await this.page.getByRole('combobox').click();
    await this.page.getByRole('option', { name: /Bank of Maharashtra/ }).click();

    const submitButton = this.page.getByRole('button', { name: 'Submit & Review' });
    await submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await submitButton.click();
  }

  async triggerLink() {
    const triggerLinkButton = this.page.getByRole('button', { name: 'Trigger Link' });
    await triggerLinkButton.scrollIntoViewIfNeeded();
    await triggerLinkButton.waitFor({ state: 'visible', timeout: 5000 });
    await triggerLinkButton.click();
    await this.page.waitForURL('**/distributor/transact/summary', { timeout: 10000 });
  }

  async returnToDashboard() {
    const backToHomeButton = this.page.getByRole('button', { name: 'Back to home' });
    await backToHomeButton.waitFor({ state: 'visible', timeout: 5000 });
    await backToHomeButton.click();
  }

  }