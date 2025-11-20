// services/ResellerService.ts

import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const PANEL_URL = process.env.RES_PANEL_URL!;
const PANEL_USERNAME = process.env.RES_PANEL_USERNAME!;
const PANEL_PASSWORD = process.env.RES_PANEL_PASSWORD!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createResellerSubscription(userEmail: string, plan: string) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  try {
    // Login to reseller panel
    await page.goto(PANEL_URL, { waitUntil: 'networkidle0' });
    await page.type('input[name="username"]', PANEL_USERNAME);
    await page.type('input[name="password"]', PANEL_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Navigate to create subscription page (update selector)
    await page.goto(`${PANEL_URL}/create-subscription`, { waitUntil: 'networkidle0' });

    // Fill subscription form
    await page.type('input[name="customer_email"]', userEmail);
    await page.select('select[name="plan_select"]', plan);

    await page.click('button[type="submit"]'); // Replace with actual save button
    await page.waitForTimeout(2000); // Wait for creation

    // Extract subscription info (update selectors)
    const subscription_id = await page.$eval('#subscription_id', el => el.textContent?.trim() || '');
    const reseller_customer_id = await page.$eval('#customer_id', el => el.textContent?.trim() || '');
    const stream_url = await page.$eval('#m3u_url', el => el.textContent?.trim() || '');
    const expiry = await page.$eval('#expiry_date', el => el.textContent?.trim() || '');

    // Save to Supabase
    await supabase.from('users').update({
      reseller_customer_id,
      subscription_id,
      stream_url,
      status: 'active',
      expiry,
      plan
    }).eq('email', userEmail);

    console.log(`✅ Subscription created for ${userEmail}`);
    return { reseller_customer_id, subscription_id, stream_url, expiry, plan };

  } catch (err) {
    console.error('❌ Puppeteer error:', err);
    return null;
  } finally {
    await browser.close();
  }
}
