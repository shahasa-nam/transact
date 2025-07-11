import { test } from '@playwright/test';

import { TransactionNavigationPage } from './transnavi';
import { LumpsumTransactionPage } from './lstrans';
import { LumpsumPaymentPage } from './lspayment';
import {lumpsumstp} from './lsstp';

test.use({ storageState: 'auth-storage.json' });

test.describe.serial('Lumpsum Transaction Flow', () => {
  const investorName = 'namrata hemant shahasane';
  const schemeType = 'Equity';
  const schemeName = 'Kotak Business Cycle Fund - Regular Plan - Growth';
  const amount = '2000';
  const type='Debt';
  const stpName = 'Kotak Bond - Regular Plan - Growth';
  const frequencies =['Monthly', 'Daily', 'Weekly', 'Quarterly'];
  const date = '2';
  const install= '12';
  const stpamount ='1200';


  test('IFA user performs lumpsum transaction successfully', async ({ page }) => {

    for (const frequency of frequencies) {
    console.log(`Running for frequency: ${frequency}`);

    const navPage = new TransactionNavigationPage(page);
    const transactionPage = new LumpsumTransactionPage(page);
    const paymentPage =new LumpsumPaymentPage(page);
    const stpform = new lumpsumstp(page);

    await navPage.gotoDashboard();
    await navPage.navigateToTransactionForm('Lumpsum');
    await navPage.selectInvestor(investorName);

    await transactionPage.verifyFormLoaded();
    await transactionPage.fillTransactionDetails(schemeType, schemeName, amount);

    await stpform.fillStpDetails(type, stpName,frequency,date, install,stpamount);
  
    await paymentPage.verifycartFormLoaded();
    await paymentPage.submitTransaction();
    await paymentPage.triggerLink();
    await paymentPage.returnToDashboard();
    }
    
  });

});