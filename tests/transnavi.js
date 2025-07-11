export class TransactionNavigationPage {
  constructor(page) {
    this.page = page;
  }

  async gotoDashboard() {
    await this.page.goto('https://kuberkbh.mfdevops.com/distributor/dashboard');
    await this.page.waitForURL('**/distributor/dashboard',{timeout: 3000});
  }

  async navigateToTransactionForm(transactionType = 'Lumpsum') {
  
    const transactionMenu = this.page.locator('#lg-sidebar').getByText('Transaction', { exact: true });
    await transactionMenu.waitFor({ state: 'visible', timeout: 10000 });
    await transactionMenu.click();

    const transMenu =this.page.locator('#lg-sidebar div').filter({ hasText: /^Initiate Transaction$/ });
    await transMenu.waitFor ({starte :'visible',timeout:1000});
    await transMenu.click();
  
    await this.page.getByText('Existing Investor').click();

    // Dynamic selector based on type
    await this.page.locator('div').filter({ hasText: new RegExp(`^${transactionType}$`) }).nth(1).click();
  }

  async selectInvestor(investorName) {
    await this.page.waitForURL('**/distributor/transact/investor-list');
    const investorSearch = this.page.getByRole('textbox', { name: 'Search by Investor Name' });
    await investorSearch.click();
    await investorSearch.fill(investorName);

    const investorOption = this.page.locator('ion-text', { hasText: investorName }).first();
    await investorOption.waitFor({ state: 'visible', timeout: 5000 });
    await investorOption.click();
  }
}
