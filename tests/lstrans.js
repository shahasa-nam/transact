export class LumpsumTransactionPage {
  constructor(page) {
    this.page = page;
  }

  async verifyFormLoaded() {
    await this.page.waitForURL('**/distributor/transact/lumpsum');
  }

  async fillTransactionDetails(schemeType, schemeName, amount) {
    

     const schemeTypeDropdown = this.page.locator('ng-select').filter({ hasText: 'Select Scheme Type××' });
      await schemeTypeDropdown.click();
      await this.page.getByRole('option', { name: schemeType}).click();


      const schemeNameDropdown = this.page.locator('ng-select').filter({ hasText: 'Select Scheme Name××' });
      await schemeNameDropdown.click();
      await this.page.getByText(schemeName, { exact: true }).click();

    await this.page.getByPlaceholder('Enter Amount').fill(amount);
  
    const stptran =this.page.getByRole('radio', { name: 'Register STP' });
    await stptran.waitFor({ state: 'visible', timeout: 10000 });
    await stptran.click();
    
   // await this.page.getByRole('radio', { name: 'None' }).click();
   
  }
 
}