import { test, expect, devices } from '@playwright/test';

test('oresponsive screenshots', async ({ browser }) => {
  const iPhone13 = devices['iPhone 13'];
  const iPadPro11 = devices['iPad Pro 11'];

  // ---------- Laptop View ----------
  const laptopContext = await browser.newContext();
  const laptopPage = await laptopContext.newPage();

  await laptopPage.goto('https://getkirby.com/');
  await laptopPage.waitForLoadState('networkidle');
  await laptopPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await laptopPage.waitForTimeout(1000);
  await laptopPage.screenshot({ path: 'laptopview.png', fullPage: true });

  await laptopPage.close();
  await laptopContext.close();

  // ---------- Mobile View (iPhone 13) ----------
  const mobileContext = await browser.newContext({
    ...iPhone13,
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto('https://getkirby.com/');
  await mobilePage.waitForLoadState('networkidle');
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'mobileview.png', fullPage: true });

  await mobilePage.close();
  await mobileContext.close();

  // ---------- Tablet View (iPad Pro 11) ----------
  const tabletContext = await browser.newContext({
    ...iPadPro11,
  });
  const tabletPage = await tabletContext.newPage();

  await tabletPage.goto('https://getkirby.com/');
  await tabletPage.waitForLoadState('networkidle');
  await tabletPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await tabletPage.waitForTimeout(1000);
  await tabletPage.screenshot({ path: 'tabletview.png', fullPage: true });

  await tabletPage.close();
  await tabletContext.close();
});
