import React, { useEffect, useState } from "react";

interface SubscriptionCardProps {
  userEmail: string; // email of the logged-in user
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ userEmail }) => {
  const [status, setStatus] = useState<'active' | 'expired' | 'canceled' | null>(null);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getUserSubscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      setStatus(data.status);
      setNextBillingDate(data.nextBillingDate);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
      setStatus(null);
      setNextBillingDate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [userEmail]);

  const handleSubscribe = async () => {
    setSubmitting(true);
    try {
      // Call backend endpoint that triggers Puppeteer / ResellerService
      const res = await fetch("/api/createSubscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchSubscription(); // refresh status
      } else {
        alert("Subscription creation failed. Try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Subscription creation failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-lg p-8 max-w-2xl mx-auto flex items-center justify-center text-white">
        Loading subscription...
      </div>
    );
  }

  const isActive = status === "active";

  return (
    <div className="bg-zinc-900 rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Subscription</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Status</span>
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {status ? status.toUpperCase() : "INACTIVE"}
          </span>
        </div>

        {isActive && nextBillingDate && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80">Next Billing Date</span>
            <span className="text-white font-semibold">
              {new Date(nextBillingDate).toLocaleDateString()}
            </span>
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
          disabled={submitting}
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Subscribe Now - R89/month"}
        </button>
      )}

      {isActive && (
        <div className="text-center text-white/60 text-sm">
          Your subscription will automatically renew on{" "}
          {nextBillingDate && new Date(nextBillingDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
