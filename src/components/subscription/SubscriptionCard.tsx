import React from 'react';

interface SubscriptionCardProps {
  status: 'active' | 'expired' | 'canceled' | null;
  nextBillingDate: string | null;
  onSubscribe: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ status, nextBillingDate, onSubscribe }) => {
  const isActive = status === 'active';

  return (
    <div className="bg-zinc-900 rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Subscription</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Status</span>
          <span className={`px-4 py-2 rounded-full font-semibold ${
            isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {status ? status.toUpperCase() : 'INACTIVE'}
          </span>
        </div>

        {isActive && nextBillingDate && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80">Next Billing Date</span>
            <span className="text-white font-semibold">{new Date(nextBillingDate).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Monthly Price</span>
          <span className="text-white font-semibold">R89.00</span>
        </div>
      </div>

      {!isActive && (
        <button
          onClick={onSubscribe}
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition"
        >
          Subscribe Now - R89/month
        </button>
      )}

      {isActive && (
        <div className="text-center text-white/60 text-sm">
          Your subscription will automatically renew on {nextBillingDate && new Date(nextBillingDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
