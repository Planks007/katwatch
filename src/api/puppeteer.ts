// api/puppeteer.ts (Vercel serverless)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const content = await page.content();
  await browser.close();

  res.status(200).json({ content });
}
