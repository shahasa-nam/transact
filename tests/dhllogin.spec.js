import { test} from '@playwright/test';

test('ifa user login', async({browser})=>
{
  
    //initate browser
    const context = await browser.newContext();  //instance
    const page = await context.newPage();       //page
     

    // redirection to login page
    await page.goto('https://dhladminuat.asmadiya.net/admin/login');
    
  
   
   // Enter username & password
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('super admin');
  
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('12345');

  await page.getByRole('button', { name: 'Submit' }).click();

  await page.waitForURL('https://dhladminuat.asmadiya.net/',{timeout: 30000});
  console.log(page.url());


  // redirection to admin page notification
  await page.getByRole('link', { name: 'Notification Notification' }).click();
  await page.getByRole('heading', { name: ' Notification' }).click();

  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'logout Log Out' }).click();
   
await context.close();

  await browser.close();

});