import { serve } from 'https://deno.land/std@0.181.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

serve(async (req) => {
  try {
    const { email } = await req.json();
    if (!email) return new Response('Missing email', { status: 400 });

    const { data: user, error } = await supabase
      .from('users')
      .select('stream_url, status')
      .eq('email', email)
      .single();

    if (error || !user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    if (user.status !== 'active') return new Response(JSON.stringify({ error: 'Subscription inactive' }), { status: 403 });

    return new Response(JSON.stringify({ stream_url: user.stream_url }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
});
