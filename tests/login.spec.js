import { test} from '@playwright/test';

test('ifa user login', async({browser})=>
{
  // ARN array
  const users =['150430_KOTAK','1390_KOTAK'];

  for (let i=0 ; i< users.length; i++) {

    //initate browser
    const context = await browser.newContext();  //instance
    const page = await context.newPage();       //page
     

    // redirection to landing page
    await page.goto('https://kbh.mfdevops.com/');
    
   // Direct to login page
  
    await page.getByRole('button', { name: 'LOGIN/REGISTER'}).click();
   
   // Enter ARN no. 
   await page.locator("[id='ion-input-1']").fill(users[i]); 
   //await page.locator('#ion-input-1').fill('150430_KOTAK'); //id
   await page.getByRole('button',{name:'CONTINUE'}).click();
   

  //For non-ifa user
  if ( i==1){
    await page.waitForURL('https://kbh.mfdevops.com/login/independent-distributor',{timeout: 30000});

    //enter email id
    await page.getByPlaceholder('Please enter email ID').click();
    await page.getByPlaceholder('Please enter email ID').fill('namrata');
    await page.getByRole('button', { name: 'Continue' }).click();
  }
  
  //for ifa user
  //Wait for navigation to the OTP page
  await page.waitForURL('https://kbh.mfdevops.com/login/login-via-otp',{timeout: 30000});
  

  //Enter Otp
  await page.getByPlaceholder('Enter OTP').click();
  await page.getByPlaceholder('Enter OTP').fill('507011');
  // await page.waitForLoadState('load');
  await page.waitForTimeout(10000);

  //Redurecting to the Dashboard
  // await page.getByRole('banner').getByRole('img', { name: 'logo' }).toBeVisible();
  const currentUrl = await page.url();
  console.log('Current URL:', currentUrl)

  // const ifaUrl ='https://kbh.mfdevops.com/distributor/dashboard';
  // const nonifaUrl ='https://kbh.mfdevops.com/distributor/transact/select-transaction';
  
  // if (currentUrl === ifaUrl) {
  //   console.log('IFA user login sucessfully & redirect to Dashboard.');
  //   console.log('Current URL:', currentUrl)

  // } else if (currentUrl === nonifaUrl) {
  //   console.log('Non-ifa login sucessfully redirect to transaction page');
  //   console.log('Current URL:', currentUrl)
  // }

await context.close();
}

  await browser.close();
});