import { test, expect, request } from '@playwright/test';
import axios from 'axios';
const payload ={data:"U2FsdGVkX1/HSELIwIPs3E6nwT5eDIbfEtEXTlRNg1KLN02zGCXeuO0/+6Jdm0tGKfhDgUUe9U+8WGxAUFBCkw=="};
let token;

test.beforeAll ( async()=>
{

  const apiContext = await request.newContext();
  var loginresponse = await axios.post("https://dev.dhlapi.asmadiya.com/dhl/api/adminlogin/login", payload, {headers: {'Content-Type': 'application/json',},});

  // expect(loginresponse.ok()).toBeTruthy();

  const responsejson = await loginresponse;

  token = responsejson.data.data;
  console.log(token);

});


test('admin module redirection', async({page})=>
  {
    
    page.addInitScript(token => {
      window.localStorage.setItem('token',token);
    },token);
      
    
    await page.goto('https://dhladminuat.asmadiya.net/');
    await page.waitForURL('https://dhladminuat.asmadiya.net/',{timeout: 20000});

  const storedToken = await page.evaluate(() => window.localStorage.getItem('token'));
  console.log("Token in localStorage:", storedToken);
    
  
  
  // redirection to admin notificatio npage
    await page.getByRole('link', { name: 'Notification Notification' }).click();
    await page.getByRole('heading', { name: 'Notification' }).click();

   });




   








// login.js
// const { chromium } = require('playwright');
// const fs = require('fs');

// (async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // Navigate to the login page and perform login
//   await page.goto('https://your-app.com/login');
//   await page.fill('#username', 'your-username');
//   await page.fill('#password', 'your-password');
//   await page.click('#loginButton');

//   // Wait for the page to load or navigate to a page with token in localStorage
//   await page.waitForNavigation();

//   // Get token from localStorage or cookies
//   const token = await page.evaluate(() => {
//     return localStorage.getItem('authToken');  // or adjust for your token name
//   });

//   // Save the token to a file
//   fs.writeFileSync('authToken.json', JSON.stringify({ token }));

//   await browser.close();
// })();


// // example.test.js
// const { chromium } = require('playwright');
// const fs = require('fs');

// (async () => {
//   const tokenData = JSON.parse(fs.readFileSync('authToken.json'));
//   const token = tokenData.token;

//   const browser = await chromium.launch();
//   const context = await browser.newContext({
//     extraHTTPHeaders: {
//       Authorization: `Bearer ${token}`,  // Adjust header based on your app's authentication
//     },
//   });

//   const page = await context.newPage();
//   await page.goto('https://your-app.com/protected-page');

//   // Your test code here
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();
