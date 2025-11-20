import { createClient } from '@supabase/supabase-js';
import { createIPTVAccount } from '@/reseller/PuppeteerService';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL!, process.env.REACT_APP_SUPABASE_ANON_KEY!);

export async function createUserSubscription(email: string) {
  const password = Math.random().toString(36).slice(-8);

  // 1️⃣ Create Supabase subscription
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{ user_email: email, status: 'active', expires_at: new Date(Date.now() + 30*24*60*60*1000).toISOString() }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2️⃣ Create IPTV account in reseller panel
  await createIPTVAccount(email, password);

  return { status: data.status, nextBillingDate: data.expires_at };
}
