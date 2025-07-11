const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Basic homepage check, list and visit hyperlinks', async ({ browser }) => {
  const targetUrl = 'https://asmadiya.com/';
  const screenshotDir = 'screenshots';

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`🌐 Navigating to ${targetUrl}`);
  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });

  // ✅ Check title and body content
  await expect(page).toHaveTitle(/.+/);
  const bodyContent = await page.locator('body').innerText();
  expect(bodyContent.length).toBeGreaterThan(0);
  console.log('✅ Home page loaded with visible content');

  // 🖼️ Screenshot
  const screenshotPath = path.join(screenshotDir, 'homepage.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`🖼️ Screenshot saved at ${screenshotPath}`);

  // 🔗 Extract hyperlinks
  const links = await page.$$eval('a[href]', anchors =>
    anchors
      .filter(a =>
        a.href &&
        !a.href.startsWith('mailto:') &&
        !a.href.startsWith('tel:') &&
        a.innerText.trim() !== ''
      )
      .map(a => ({
        text: a.innerText.trim(),
        href: a.href
      }))
  );

  console.log(`🔗 Found ${links.length} valid hyperlinks:`);

  // 🌍 Visit each link in a new tab and log the final URL
  for (let i = 0; i < links.length; i++) {
    const { text, href } = links[i];
    try {
      const newPage = await context.newPage();
      console.log(`🔎 Visiting (${i + 1}): ${text} - ${href}`);
      await newPage.goto(href, { waitUntil: 'domcontentloaded', timeout: 30000 });

      const currentURL = newPage.url();
      console.log(`✅ Final URL: ${currentURL}`);

      await newPage.close();
    } catch (err) {
      console.warn(`❌ Failed to navigate to ${href}: ${err.message}`);
    }
  }

  console.log('✅ Link redirection and final URL logging completed');
});
