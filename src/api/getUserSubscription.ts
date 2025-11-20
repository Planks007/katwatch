// src/api/getUserSubscription.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface SubscriptionStatus {
  status: 'active' | 'expired' | 'canceled' | null;
  nextBillingDate: string | null;
}

export async function getUserSubscription(email: string): Promise<SubscriptionStatus> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching subscription:', error.message);
    return { status: null, nextBillingDate: null };
  }

  // Check if subscription is active
  const now = new Date();
  let status: 'active' | 'expired' | 'canceled' | null = null;

  if (data) {
    if (data.status === 'canceled') status = 'canceled';
    else if (new Date(data.expires_at) > now) status = 'active';
    else status = 'expired';
  }

  return {
    status,
    nextBillingDate: data?.expires_at || null,
  };
}
