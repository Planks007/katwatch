import React, { useState } from 'react';

interface SubscriptionCardProps {
  userEmail: string; // pass logged-in user email
  status: 'active' | 'expired' | 'canceled' | null;
  nextBillingDate: string | null;
}

interface SubscriptionResponse {
  status: 'active' | 'expired' | 'canceled';
  nextBillingDate: string | null;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ userEmail, status, nextBillingDate }) => {
  const [loading, setLoading] = useState(false);
  const [subStatus, setSubStatus] = useState(status);
  const [nextDate, setNextDate] = useState(nextBillingDate);

  const handleSubscribe = async () => {
    if (!userEmail) return alert('Please login to subscribe');

    setLoading(true);

    try {
      // Call serverless function via HTTP instead of direct import
      const res = await fetch('/api/createUserSubscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!res.ok) throw new Error('Failed to create subscription');

      const subscription: SubscriptionResponse = await res.json();

      setSubStatus(subscription.status);
      setNextDate(subscription.nextBillingDate);

      alert('✅ Subscription created successfully!');
    } catch (err: any) {
      console.error(err);
      alert('❌ Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  const isActive = subStatus === 'active';

  return (
    <div className="bg-zinc-900 rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Subscription</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Status</span>
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {subStatus ? subStatus.toUpperCase() : 'INACTIVE'}
          </span>
        </div>

        {isActive && nextDate && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80">Next Billing Date</span>
            <span className="text-white font-semibold">{new Date(nextDate).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Monthly Price</span>
          <span className="text-white font-semibold">R89.00</span>
        </div>
      </div>

      {!isActive && (
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Subscribe Now - R89/month'}
        </button>
      )}

      {isActive && (
        <div className="text-center text-white/60 text-sm">
          Your subscription will automatically renew on {nextDate && new Date(nextDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
