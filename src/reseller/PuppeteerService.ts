import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

export async function createIPTVAccount(username: string, password: string) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto(`${process.env.RESELLER_PANEL_URL}admin/index.php`, { waitUntil: 'networkidle0' });
    await page.type('input[name="username"]', process.env.RESELLER_USER!);
    await page.type('input[name="password"]', process.env.RESELLER_PASS!);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Add user
    await page.goto(`${process.env.RESELLER_PANEL_URL}admin/users.php?sub=add`, { waitUntil: 'networkidle0' });
    await page.select('select[name="line_type"]', 'line');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.select('select[name="package"]', '131'); // your package ID
    await page.click('input[name="is_isplock"]');

    // Save
    await page.evaluate(() => save());
    await page.waitForTimeout(2000);

    console.log(`✅ IPTV account created: ${username}`);
  } catch (err) {
    console.error('❌ Puppeteer error:', err);
    throw err;
  } finally {
    await browser.close();
  }
}
