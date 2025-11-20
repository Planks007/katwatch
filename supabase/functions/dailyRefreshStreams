import 'dotenv/config';
import { createResellerSubscription } from '../../services/ResellerService.ts';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function refreshAllStreams() {
  const { data: users, error } = await supabase
    .from('users')
    .select('email, plan')
    .eq('status', 'active');

  if (error || !users) return console.error('Error fetching users', error);

  for (const user of users) {
    try {
      await createResellerSubscription(user.email, user.plan);
      console.log(`✅ Refreshed stream for ${user.email}`);
    } catch (err) {
      console.error(`❌ Failed to refresh ${user.email}:`, err);
    }
  }
}
