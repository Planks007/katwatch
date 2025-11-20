// src/pages/Index.tsx
import React, { useState } from 'react';
import { MediaRow } from '@/components/media/MediaRow';
import { MediaDetailModal } from '@/components/media/MediaDetailModal';
import { ResellerMedia } from '@/services/ResellerService';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';

const Index: React.FC = () => {
  const { user, subscription } = useAuth();
  const [selectedMedia, setSelectedMedia] = useState<ResellerMedia | null>(null);

  // Play media only if subscription is active
  const handlePlay = () => {
    if (!subscription || subscription.status !== 'active') {
      alert('You need an active subscription to play this content.');
      return;
    }

    if (selectedMedia) {
      window.open(selectedMedia.stream_url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome, {user?.email || 'Guest'}
        </h1>

        {/* Subscription Card */}
        {!subscription || subscription.status !== 'active' ? (
          <SubscriptionCard
            userEmail={user?.email ?? ''}
            status={subscription?.status ?? null}
            nextBillingDate={subscription?.nextBillingDate ?? null}
          />
        ) : null}

        {/* Media Row */}
        {user ? (
          <MediaRow
            userId={user.id}
            onMediaClick={(media) => setSelectedMedia(media)}
          />
        ) : (
          <p className="text-white">Please log in to see your media.</p>
        )}

        {/* Media Detail Modal */}
        {selectedMedia && (
          <MediaDetailModal
            isOpen={!!selectedMedia}
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
            onPlay={handlePlay}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
