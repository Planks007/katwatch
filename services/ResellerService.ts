// src/services/ResellerService.ts
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

interface ResellerMedia {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  description: string;
  runtime: number;
  category: string;
  streamUrl: string;
}

export class ResellerService {
  static async getUserStreams(userEmail: string): Promise<ResellerMedia[]> {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    try {
      // LOGIN
      await page.goto(`${process.env.RESELLER_PANEL_URL}admin/index.php`, { waitUntil: 'networkidle0' });
      await page.type('input[name="username"]', process.env.RESELLER_USER!);
      await page.type('input[name="password"]', process.env.RESELLER_PASS!);
      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      // NAVIGATE TO USER STREAMS
      // Example: assume page with user streams is /admin/users.php?email={userEmail}
      await page.goto(`${process.env.RESELLER_PANEL_URL}admin/users.php?email=${userEmail}`, { waitUntil: 'networkidle0' });

      // Extract media data from table or page structure
      const streams: ResellerMedia[] = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        return rows.slice(1).map(row => {
          const cols = row.querySelectorAll('td');
          return {
            id: cols[0].textContent?.trim() || '',
            title: cols[1].textContent?.trim() || 'Untitled',
            thumbnail: cols[2]?.querySelector('img')?.getAttribute('src') || '/assets/default.jpg',
            rating: parseFloat(cols[3]?.textContent || '0'),
            description: cols[4]?.textContent || '',
            runtime: parseInt(cols[5]?.textContent || '0'),
            category: cols[6]?.textContent || 'General',
            streamUrl: cols[7]?.querySelector('a')?.getAttribute('href') || ''
          };
        });
      });

      await browser.close();
      return streams;
    } catch (err) {
      await browser.close();
      console.error('ResellerService error:', err);
      return [];
    }
  }

  static async createSubscription(userEmail: string, username: string, password: string, packageId: string = '131') {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    try {
      // LOGIN
      await page.goto(`${process.env.RESELLER_PANEL_URL}admin/index.php`, { waitUntil: 'networkidle0' });
      await page.type('input[name="username"]', process.env.RESELLER_USER!);
      await page.type('input[name="password"]', process.env.RESELLER_PASS!);
      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      // ADD NEW USER / SUBSCRIPTION
      await page.goto(`${process.env.RESELLER_PANEL_URL}admin/users.php?sub=add`, { waitUntil: 'networkidle0' });
      await page.select('select[name="line_type"]', 'line');
      await page.type('input[name="username"]', username);
      await page.type('input[name="password"]', password);
      await page.select('select[name="package"]', packageId);
      await page.click('input[name="is_isplock"]');

      await page.evaluate(() => (window as any).save()); // Calls panel's save function
      await page.waitForTimeout(2000);

      await browser.close();
      console.log(`✅ Subscription created for ${username}`);
      return true;
    } catch (err) {
      await browser.close();
      console.error('ResellerService createSubscription error:', err);
      return false;
    }
  }
}
