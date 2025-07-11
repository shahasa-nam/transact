// import { test} from '@playwright/test';

// const fs = require('fs');


// test('ifa user login', async({browser})=>
// {
  
//     //initate browser
//     const context = await browser.newContext();  //instance
//     const page = await context.newPage();       //page
     

//     // redirection to login page
//     await page.goto('https://dhladminuat.asmadiya.net/admin/login');

//     // Enter username & password
//   await page.getByPlaceholder('username').click();
//   await page.getByPlaceholder('username').fill('super admin');
  
//   await page.getByPlaceholder('password').click();
//   await page.getByPlaceholder('password').fill('12345');

//   await page.getByRole('button', { name: 'Submit' }).click();


//   // wait till dashboaard load
//   await page.waitForURL('https://dhladminuat.asmadiya.net/',{timeout: 30000});


//   // Get token from localStorage or cookies
//   const token = await page.evaluate(() => {
//     return localStorage.getItem('authToken');  // or adjust for your token name
//   });


//   // Save the token to a file

//   fs.writeFileSync('authToken.json', JSON.stringify({ token }));

//   await browser.close();
// });

import { test} from '@playwright/test';

const fs = require('fs');

test(' user login', async({browser})=>
    {
      
    //     //initate browser
      const context = await browser.newContext();  //instance
      const page = await context.newPage();  

  let authToken = null;

  // Listen to responses
  page.on('response', async (response) => {
    try {
      // Check if the response URL matches the login endpoint
      if (response.url().includes('https://dev.dhlapi.asmadiya.com/dhl/api/adminlogin/login')) { // Adjust this to your app's login/auth endpoint
        const body = await response.json();
        authToken = body.token; // Adjust based on the actual response structure
      }
    } catch (error) {
      console.error('Error processing response:', error);
    }
  });

  // Perform login
  await page.goto('https://dhladminuat.asmadiya.net/admin/login');
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('super admin');
  
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('12345');

  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait for navigation or a condition indicating login is complete
  await page.waitForURL('https://dhladminuat.asmadiya.net/',{timeout: 30000});

  // Save the token to a file
  if (authToken) {
    fs.writeFileSync('authToken.json', JSON.stringify({ token: authToken }));
    console.log('Token saved to authToken.json');
  } else {
    console.log('Token not found');
  }

  await browser.close();
});
