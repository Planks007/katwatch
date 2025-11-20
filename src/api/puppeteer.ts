import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://your-panel.com/login');
    // scraping logic here
    const streams = await page.evaluate(() => {
      // extract the needed data
      return Array.from(document.querySelectorAll('.stream')).map(el => ({
        name: el.querySelector('.title')?.textContent,
        url: el.querySelector('a')?.getAttribute('href')
      }));
    });

    await browser.close();
    res.status(200).json({ streams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
}
