
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Visual snapshot of homepage', async ({ page }) => {
  await page.goto('https://asmadiya.com/');
   await page.waitForURL('https://asmadiya.com/', { timeout: 60000 });
   // await page.waitForSelector('#animation.animation', { timeout: 40000 });
   //await expect(page.locator('.animation')).toBeVisible({ timeout: 40000 });

  
  await percySnapshot(page, 'Homepage - Desktop one', {
    widths: [1280] // Example desktop width
  });

  await percySnapshot(page, 'Homepage - Desktop two', {
    widths: [1366] // Example desktop width
  });

  await percySnapshot(page, 'Homepage - Desktop three', {
    widths: [1920] // Example desktop width
  });

  await percySnapshot(page, 'Homepage - Desktop four', {
    widths: [1208] // Example desktop width
  });
 
  await percySnapshot(page, 'Homepage - Desktop five', {
    widths: [1536] // Example desktop width
  });

  await percySnapshot(page, 'Homepage - Tablet', {
    widths: [768] // Common tablet width (e.g., iPad in portrait)
  });

  await percySnapshot(page, 'Homepage - Mobile', {
    widths: [375] // Common mobile width (e.g., iPhone X/11/12/13/14 portrait)
  });

});
