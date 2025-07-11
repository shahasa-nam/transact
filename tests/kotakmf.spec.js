import { test, expect } from '@playwright/test';

const menuNames = ['Our Funds', 'Learn', 'Plan Now', 'Resources', 'Calculators'];

test.describe.serial('Menu test suite with screenshot', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://beta.kotakmf.com/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Click menu buttons, check submenu items, and take menu screenshot', async ({ page }) => {
    // Take screenshot of the full menu section (before interactions)
   const menuSection = page.locator('.kmf-header').first();
   await menuSection.screenshot({ path: 'screenshots/menu-section-before.png' });    

    for (const name of menuNames) {
      const button = page.getByRole('button', { name });

      try {
        await button.waitFor({ state: 'visible', timeout: 5000 });
        await button.click();
        console.log(`Clicked menu button: ${name}`);
      } catch (e) {
        console.error(`Failed to find or click button: ${name}`, e);
        continue;
      }

      try {
        const dropdown = button.locator('xpath=ancestor::div[contains(@class, "kmf-dropdown")]');
        const submenu = dropdown.locator('.kmf-dropdown-menu');
        await submenu.waitFor({ state: 'visible', timeout: 5000 });

        const items = await submenu.locator('p').allTextContents();
        console.log(`Submenu under "${name}":`, items);
        expect(items.length).toBeGreaterThan(0);

        // Take screenshot of menu section after submenu is opened
        await menuSection.screenshot({ path: `screenshots/menu-${name.replace(/\s+/g, '_')}.png` });

      } catch (e) {
        console.error(`Failed to validate submenu for: ${name}`, e);
      }
    }
  });
});
