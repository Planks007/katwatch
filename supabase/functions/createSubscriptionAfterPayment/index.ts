import { serve } from 'https://deno.land/std@0.181.0/http/server.ts';
import { createResellerSubscription } from '../../services/ResellerService.ts';
import 'dotenv/config';

serve(async (req) => {
  try {
    const { email, plan } = await req.json();

    if (!email || !plan) {
      return new Response(JSON.stringify({ error: 'Missing email or plan' }), { status: 400 });
    }

    const subscription = await createResellerSubscription(email, plan);

    if (!subscription) {
      return new Response(JSON.stringify({ error: 'Subscription creation failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, subscription }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
});
