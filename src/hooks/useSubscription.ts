import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface Subscription {
  status: 'active' | 'expired' | 'canceled';
  next_billing_date: string;
  amount: number;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setSubscription(data);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [user]);

  const initiatePayment = async () => {
    if (!user) throw new Error('User not authenticated');

    // In production, this would redirect to Yoco checkout
    // For now, we'll simulate a successful payment
    alert('Redirecting to Yoco payment gateway...\n\nIn production, this will open the Yoco hosted checkout page.');
    
    // Simulate payment success after 2 seconds
    setTimeout(async () => {
      const nextBillingDate = new Date();
      nextBillingDate.setDate(nextBillingDate.getDate() + 30);

      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          status: 'active',
          next_billing_date: nextBillingDate.toISOString().split('T')[0],
          amount: 89.00,
          yoco_payment_id: 'demo_' + Date.now()
        });

      if (!error) {
        window.location.reload();
      }
    }, 2000);
  };

  return { subscription, loading, initiatePayment };
};
