import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/MediaRow';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';
import { PayButton } from '@/components/PayButton';
import { getUserSubscription } from '@/api/getUserSubscription'; // fetch from Supabase
import { useAuth } from '@/contexts/AuthContext';

interface Media {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
}

// Sample media; replace with API fetch if needed
const sampleMedia: Media[] = [
  { id: '1', title: 'Movie 1', thumbnail_url: '/thumb1.jpg', rating: 4.5 },
  { id: '2', title: 'Movie 2', thumbnail_url: '/thumb2.jpg', rating: 4.0 },
];

const Index: React.FC = () => {
  const { user } = useAuth(); // get logged in user from context
  const [hasSubscription, setHasSubscription] = useState(false);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);

  // Fetch subscription on mount or user change
  useEffect(() => {
    if (user?.email) {
      getUserSubscription(user.email).then((sub) => {
        if (sub?.status === 'active') {
          setHasSubscription(true);
          setNextBillingDate(sub.expires_at);
        } else {
          setHasSubscription(false);
        }
      });
    }
  }, [user]);

  const handleSubscribe = () => {
    if (!user?.email) return alert('Please login first');
    // PayButton will handle payment & subscription creation
  };

  const handleMediaClick = (id: string) => {
    if (!hasSubscription) {
      alert('You need an active subscription to play this content!');
      return;
    }
    console.log('Play media with id:', id);
    // TODO: open MediaDetailModal or player
  };

  return (
    <div className="px-4 md:px-8 py-8">
      {/* Subscription Card */}
      <SubscriptionCard
        status={hasSubscription ? 'active' : null}
        nextBillingDate={nextBillingDate}
        onSubscribe={handleSubscribe}
      />

      {/* If user has no subscription, show PayButton */}
      {!hasSubscription && user?.email && (
        <div className="my-8 max-w-2xl mx-auto">
          <PayButton userEmail={user.email} />
        </div>
      )}

      {/* Media Rows */}
      <MediaRow
        title="Movies"
        media={sampleMedia}
        onMediaClick={handleMediaClick}
        hasActiveSubscription={hasSubscription}
      />

      <MediaRow
        title="Series"
        media={sampleMedia}
        onMediaClick={handleMediaClick}
        hasActiveSubscription={hasSubscription}
      />
    </div>
  );
};

export default Index;
