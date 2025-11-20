import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export async function getUserSubscription(email: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching subscription:', error.message);
    return null;
  }

  // Check expiry
  if (data && new Date(data.expires_at) < new Date()) {
    return { ...data, status: 'expired' };
  }

  return data;
}
