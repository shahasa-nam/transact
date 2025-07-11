const { test } = require('@playwright/test');
const fs = require('fs');
const XLSX = require('xlsx');

test.use({ storageState: 'auth-storage.json' });

test('Capture request/response data', async ({ page }) => {
  const requestTimings = new Map();
  const logData = [];

  // Utility to safely truncate long strings
  const truncate = (str, max = 32000) => {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '... [truncated]' : str;
  };

  page.on('request', (request) => {
    if (request.resourceType() === 'xhr') {
      requestTimings.set(request.url(), Date.now());
    }
  });

  page.on('requestfinished', async (request) => {
    if (request.resourceType() !== 'xhr') return;

    
    if (request.url().includes('https://k.clarity.ms/collect')) return;

    const response = await request.response();
    if (!response) {
      console.warn(`No response for request: ${request.url()}`);
      return;
    }

    const endTime = Date.now();
    const startTime = requestTimings.get(request.url()) || endTime;
    const duration = endTime - startTime;

    let requestBody = request.postData() || 'N/A';

    let responseBody = '';
    try {
      responseBody = await response.text();
    } catch (e) {
      responseBody = 'Unable to parse response';
    }

    const entry = {
      Method: request.method(),
      URL: truncate(request.url()),
      Status: response.status(),
      Time: duration > 1000 ? `${(duration / 1000).toFixed(2)} s` : `${duration} ms`,
      RequestBody: truncate(requestBody),
      ResponseHeaders: truncate(JSON.stringify(response.headers(), null, 2)),
      ResponseBody: truncate(responseBody),
    };

    logData.push(entry);
    console.log(entry);
  });

    // dashboard
  await page.goto('https://kuberkbh.mfdevops.com/distributor/dashboard');
   await page.waitForURL('**/distributor/dashboard');
  await page.waitForLoadState('networkidle');
 
  //transaction history
 try {
  const transactionMenu = page.locator('#lg-sidebar').getByText('Transaction', { exact: true });
await transactionMenu.waitFor({ state: 'visible', timeout: 10000 });
await transactionMenu.click();

  const transactionHistory = page.locator('#lg-sidebar div').filter({ hasText: /^Transaction History$/ });
await transactionHistory.waitFor({ state: 'visible', timeout: 10000 });
await transactionHistory.click();

// Wait for the page to load completely
await page.waitForLoadState('networkidle');

   const pending = page.getByRole('button', { name: 'Pending', exact:true });
   await pending.waitFor({ state: 'visible', timeout: 10000 });
   await pending.click();

  //await page.getByRole('button', { name: 'Pending' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  const confirm = page.getByRole('button', { name: 'Confirmed', exact:true });
   await confirm.waitFor({ state: 'visible', timeout: 10000 });
   await confirm.click();
  //await page.getByRole('button', { name: 'Confirmed' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  const expire = page.getByRole('button', { name: 'Expired', exact:true });
   await expire.waitFor({ state: 'visible', timeout: 10000 });
   await expire.click();

  //await page.getByRole('button', { name: 'Expired' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
} catch (error) {
  console.warn('Skipping Transaction History section due to error:', error.message);
}

 
  //client list
 try {
  await page.locator('#lg-sidebar').getByText('List', { exact: true }).click({ timeout: 10000 });
  await page.locator('#lg-sidebar').getByText('Client List').click();
  await page.waitForLoadState('networkidle');
  
  const searchInput = page.getByPlaceholder('Search by pan no. or investor name');
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  await searchInput.click();
  await searchInput.fill('namrata');
  await page.waitForLoadState('networkidle');

//   const accordionHeader = page.locator('.bh-accordion-header > div').first();
// await accordionHeader.waitFor({ state: 'visible', timeout: 10000 });
// await accordionHeader.click();
// await page.waitForLoadState('networkidle');

// const viewDetailsButton = page.getByText('View Details').first();
// await viewDetailsButton.waitFor({ state: 'visible', timeout: 10000 });
// await viewDetailsButton.click();
// await page.waitForLoadState('networkidle');
 }
  catch (error) {
  console.warn('Skipping Client List / Scheme Level AUM section due to error:', error.message);
}


   try {
//await page.locator('#lg-sidebar').getByText('List', { exact: true }).click({ timeout: 10000 });
  await page.locator('#lg-sidebar').getByText('Scheme Level AUM').click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
  await page.locator('.no-border').first().click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
} catch (error) {
  console.warn('Skipping Client List / Scheme Level AUM section due to error:', error.message);
}


  //opportunities
  try {

  
  await page.locator('#lg-sidebar div').filter({ hasText: 'Opportunities' }).nth(2).click({ timeout: 10000 });
  
  const sipCard = page.locator('div.opp-main-card', {
  hasText: 'SIP Opportunities'});
  await sipCard.waitFor({ state: 'visible', timeout: 10000 });
  await sipCard.click();

await page.locator('span > .back-arrow > .icon-inner > .ionicon').click({ timeout: 10000 });
 
const activationCard = page.locator('div.opp-main-card', {
  hasText: 'ACTIVATION OPPORTUNITIES'});
await activationCard.waitFor({ state: 'visible', timeout: 10000 });
await activationCard.click();

//await page.locator('div').filter({ hasText: /^ACTIVATION OPPORTUNITIES$/ }).nth(1).click();
await page.waitForLoadState('networkidle');


  await page.locator('span > .back-arrow > .icon-inner > .ionicon').click({ timeout: 10000 });
const otherCard = page.locator('div.opp-main-card', {
  hasText: 'OTHER OPPORTUNITIES'});
await otherCard.waitFor({ state: 'visible', timeout: 10000 });
await otherCard.click();

  //await page.locator('div').filter({ hasText: /^OTHER OPPORTUNITIES$/ }).nth(1).click();
  await page.waitForLoadState('networkidle');

  await page.locator('span > .back-arrow > .icon-inner > .ionicon').click({ timeout: 10000 });
} catch (error) {
  console.warn('Skipping Opportunities section due to error:', error.message);
}


  //pro-start
  try {
  await page.locator('#lg-sidebar div').filter({ hasText: 'Prostart' }).nth(2).click({ timeout: 10000 });  
  await page.waitForLoadState('networkidle');

  const mostpopular = page.getByRole('button', { name: 'Most Popular', exact: true });
  await mostpopular.waitFor({ state: 'visible', timeout: 10000 });
  await mostpopular.click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  const newindia = page.getByRole('button', { name: 'New india' , exact: true });
  await newindia.waitFor({ state: 'visible', timeout: 10000 });
  await newindia.click({ timeout: 10000 });
   //await page.getByRole('button', { name: 'New india' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

} catch (error) {
  console.warn('Skipping Pro-start section due to error:', error.message);
}


  //co-branding
  try {
  const cobrandingLink = page.locator('#lg-sidebar').getByText('Co-branding');
  await cobrandingLink.waitFor({ state: 'visible', timeout: 10000 });
  await cobrandingLink.click();

  await page.waitForLoadState('networkidle');

  const coBrand = page.getByRole('button', { name: 'Concepts',exact: true});
  await coBrand.waitFor({ state: 'visible', timeout: 10000 });
  await coBrand.click({ timeout: 10000 });

  //await page.getByRole('button', { name: 'Concepts' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  const market = page.getByRole('button', { name: 'Markets',exact: true}); 
  await market.waitFor({ state: 'visible', timeout: 10000 });
  await market.click({ timeout: 10000 });
  //await page.getByRole('button', { name: 'Markets' }).click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  const product = page.getByRole('button', { name: 'Products', exact:true });
  await product.waitFor({ state: 'visible', timeout: 10000 });
  await product.click({ timeout: 10000 });

  //await page.getByRole('button', { name: 'Products' }).click({ timeout: 10000 });
} catch (error) {
  console.warn(' Skipping Co-branding section due to error:', error.message);
}


  //wishes
  try {
  // Click on 'Wishes' in the sidebar
  const wishesLink = page.locator('#lg-sidebar').getByText('Wishes', { exact: true });
await wishesLink.waitFor({ state: 'visible', timeout: 10000 });
await wishesLink.click();
await page.waitForLoadState('networkidle');

  await page.waitForLoadState('networkidle');

  // Locate and click 'Birthday Wishess'
  const bwishes = page.getByText('Birthday Wishess', { exact: true });
  await bwishes.waitFor({ state: 'visible', timeout: 10000 });
  await bwishes.click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');

  // Locate and click second image in bh-page-wrapper
  const otherwishes = page.locator('bh-page-wrapper').getByRole('img').nth(1);
  await otherwishes.waitFor({ state: 'visible', timeout: 10000 });
  await otherwishes.click({ timeout: 10000 });

  // Click on 'Happy Holi Everyone'
  const holi = page.getByText('Happy Holi Everyone', { exact: true });
  await holi.waitFor({ state: 'visible', timeout: 10000 });
  await holi.click({ timeout: 10000 });
  //await page.getByText('Happy Holi Everyone', { exact: true }).click({ timeout: 10000 });

} catch (error) {
  console.warn('Skipping Wishes section due to error:', error.message);
}

  //feedback

  try {
  const feedbackLink = page.locator('#lg-sidebar').getByText('Feedback & queries');
await feedbackLink.scrollIntoViewIfNeeded();
await feedbackLink.waitFor({ state: 'visible', timeout: 10000 });
await feedbackLink.click();


  const query = page.getByText('Query status', {exact: true});
  await query.waitFor({ state: 'visible', timeout: 10000 });
  await query.click({ timeout: 10000 });
//await page.getByText('Query status').click();
 
  const ask = page.getByText('Ask your query', {exact:true});
  await ask.waitFor({ state: 'visible', timeout: 10000 });
  await ask.click({ timeout: 10000 });
  //await page.getByText('Ask your query').click();

  await page.locator('#lg-sidebar').getByText('Profile').click({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
} catch (error) {
  console.warn(' Skipping Feedback & Profile section due to error:', error.message);
}


  
//Nav
  // await page.locator('#lg-sidebar').getByText('NAV').click();
  // await page.waitForLoadState('networkidle')
  // await page.waitForURL('**/distributor/nav');

  // const navpage = page.getByRole('button', { name: 'growth', exact:true});
  // await navpage.waitFor({ state: 'visible', timeout: 10000 });
  // await navpage.click({ timeout: 10000 });
  //await page.getByRole('button', { name: 'growth' }).click({ timeout: 10000 });
  
  // const idcw =page.getByRole('button', { name: 'IDCW', exact: true });
  // await idcw.waitFor({ state: 'visible', timeout: 10000 });
  // await idcw.click({ timeout: 10000 });

  //await page.getByRole('button', { name: 'IDCW' }).click({timeout: 10000});
  
 
 const worksheet = XLSX.utils.json_to_sheet(logData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'API Logs');

  try {
    XLSX.writeFile(workbook, 'api-logs.xlsx');
    console.log('Excel file saved as api-logs.xlsx');
  } catch (error) {
    console.error('Failed to write Excel file:', error.message);
  }
});
