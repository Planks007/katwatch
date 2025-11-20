// services/ResellerService.ts

import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const PANEL_URL = process.env.RES_PANEL_URL!;
const PANEL_USERNAME = process.env.RES_PANEL_USERNAME!;
const PANEL_PASSWORD = process.env.RES_PANEL_PASSWORD!;

// Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface SubscriptionData {
  reseller_customer_id: string;
  subscription_id: string;
  stream_url: string;
  status: 'active' | 'expired';
  expiry: string;
  plan: string;
}

export class ResellerService {
  private browser: puppeteer.Browser | null = null;

  // Initialize Puppeteer
  private async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true });
    }
    return this.browser;
  }

  // Log in to reseller panel
  private async login(page: puppeteer.Page) {
    await page.goto(PANEL_URL, { waitUntil: 'networkidle2' });

    // Replace selectors with actual panel login selectors
    await page.type('#username', PANEL_USERNAME);
    await page.type('#password', PANEL_PASSWORD);
    await page.click('#login-button');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Logged into reseller panel');
  }

  // Create subscription for a user
  public async createSubscription(
    userEmail: string,
    plan: string
  ): Promise<SubscriptionData> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      await this.login(page);

      // Navigate to subscription creation page (update path if needed)
      await page.goto(`${PANEL_URL}/create-subscription`, { waitUntil: 'networkidle2' });

      // Fill form (update selectors to match panel)
      await page.type('#customer_email', userEmail);
      await page.select('#plan_select', plan);
      await page.click('#create_button');

      await page.waitForSelector('#subscription_id');

      // Extract subscription info
      const subscription_id = await page.$eval('#subscription_id', el => el.textContent?.trim() || '');
      const reseller_customer_id = await page.$eval('#customer_id', el => el.textContent?.trim() || '');
      const stream_url = await page.$eval('#m3u_url', el => el.textContent?.trim() || '');
      const expiry = await page.$eval('#expiry_date', el => el.textContent?.trim() || '');

      // Save to Supabase users table
      await supabase.from('users').update({
        reseller_customer_id,
        subscription_id,
        status: 'active',
        expiry,
        plan,
        stream_url
      }).eq('email', userEmail);

      return { reseller_customer_id, subscription_id, stream_url, status: 'active', expiry, plan };

    } catch (err) {
      console.error('Error creating subscription:', err);
      throw err;
    } finally {
      await page.close();
    }
  }

  // Fetch updated M3U stream URL for a user
  public async getStream(userEmail: string): Promise<string> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      await this.login(page);

      // Go to user subscriptions page
      await page.goto(`${PANEL_URL}/subscriptions`, { waitUntil: 'networkidle2' });

      // Search by email
      await page.type('#search_email', userEmail);
      await page.click('#search_button');
      await page.waitForSelector('#m3u_url');

      const stream_url = await page.$eval('#m3u_url', el => el.textContent?.trim() || '');

      // Update Supabase with refreshed URL
      await supabase.from('users').update({ stream_url }).eq('email', userEmail);

      return stream_url;

    } catch (err) {
      console.error('Error fetching stream URL:', err);
      throw err;
    } finally {
      await page.close();
    }
  }

  // Close Puppeteer browser
  public async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
