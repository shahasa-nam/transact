const { test } = require('@playwright/test');
const fs = require('fs');
const XLSX = require('xlsx');

test('Log all XHR API calls and save to Excel', async ({ page }) => {
  const requestTimings = new Map();
  const logData = [];

  // Capture request start time

  page.on('request', (request) => {
    if (['xhr'].includes(request.resourceType())) {
      requestTimings.set(request.url(), Date.now());
    }
  });

  // Capture request finish and log details
  page.on('requestfinished', async (request) => {
    if (['xhr'].includes(request.resourceType())) {
      const response = await request.response();
      const endTime = Date.now();
      const startTime = requestTimings.get(request.url()) || endTime;
      const duration = endTime - startTime;

      const entry = {
        Method: request.method(),
        URL: request.url(),
        Status: response?.status(),
        Time_ms: duration,
      };

      logData.push(entry);
      console.log(entry);
    }
  });

   await page.goto('https://kuberkbh.mfdevops.com/');
  await page.waitForURL('https://kuberkbh.mfdevops.com/');
  await page.waitForTimeout(1000);
 
  await page.getByRole('button', { name: 'LOGIN/REGISTER' }).click();
  await page.waitForURL('https://kuberkbh.mfdevops.com/login/arn');
  await page.waitForTimeout(1000);
 
  await page.locator('#ion-input-1').fill('321739_KOTAK')
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.waitForURL('https://kuberkbh.mfdevops.com/login/login-via-otp');
  await page.waitForTimeout(1000);
 
  await page.getByPlaceholder('Enter OTP').fill('507011');
  await page.waitForURL('**/distributor/dashboard');
  await page.waitForTimeout(1000); 
  

   // Give time for all APIs to finish

  // Convert log data to Excel
  const worksheet = XLSX.utils.json_to_sheet(logData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'API Logs');

  // Save to Excel file
  XLSX.writeFile(workbook, 'api-logs.xlsx');
  console.log('Excel file saved as api-logs.xlsx');
});
