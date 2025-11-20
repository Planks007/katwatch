import React, { useState } from 'react';
import { createUserSubscription } from '@/api/createUserSubscription';

interface PayButtonProps {
  userEmail: string;
}

export const PayButton: React.FC<PayButtonProps> = ({ userEmail }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!userEmail) return alert('Please login');

    setLoading(true);

    try {
      // 1️⃣ Redirect / create Yoco payment here
      // Pseudo code: const paymentResult = await yocoCheckout(amount, email)

      const paymentResult = { success: true }; // simulate for now

      if (paymentResult.success) {
        // 2️⃣ Create subscription after payment
        await createUserSubscription(userEmail);
        alert('✅ Payment successful and subscription activated!');
      } else {
        alert('❌ Payment failed');
      }
    } catch (err: any) {
      console.error(err);
      alert('❌ Payment error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Pay & Subscribe - R89/month'}
    </button>
  );
};
