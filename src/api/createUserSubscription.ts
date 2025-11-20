// src/api/createUserSubscription.ts
import { createClient } from '@supabase/supabase-js';
import { createIPTVAccount } from '@/reseller/PuppeteerService';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function createUserSubscription(email: string) {
  // 1️⃣ Create subscription in Supabase
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_email: email,
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2️⃣ Call Puppeteer to create reseller account
  // Here we assume username = email, password = randomly generated
  const password = Math.random().toString(36).slice(-8);
  await createIPTVAccount(email, password);

  // 3️⃣ Return subscription info
  return {
    status: data.status,
    nextBillingDate: data.expires_at,
  };
}
