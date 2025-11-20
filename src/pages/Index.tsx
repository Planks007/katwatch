// src/pages/Index.tsx
import React, { useState } from 'react';
import MediaRow from '@/components/media/MediaRow';
import MediaDetailModal from '@/components/media/MediaDetailModal';
import { ResellerService, ResellerMedia } from '@/services/ResellerService';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';

const Index: React.FC = () => {
  const { user, subscription } = useAuth();
  const [selectedMedia, setSelectedMedia] = useState<ResellerMedia | null>(null);

  // Fetch user streams via React Query
  const { data: mediaList = [], isLoading } = useQuery<ResellerMedia[]>(
    ['userStreams', user?.id],
    () => ResellerService.getUserStreams(user!.id),
    {
      enabled: !!user,
    }
  );

  // Handle media card click
  const handleMediaClick = (id: string) => {
    const media = mediaList.find((m) => m.id === id);
    if (media) setSelectedMedia(media);
  };

  // Handle play
  const handlePlay = () => {
    if (!subscription || subscription.status !== 'active') {
      alert('You need an active subscription to play this content.');
      return;
    }

    if (selectedMedia) {
      window.open(selectedMedia.stream_url, '_blank');
    }
  };

  // Handle subscribe click
  const handleSubscribe = () => {
    alert('Redirecting to subscription page...');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome, {user?.email || 'Guest'}
        </h1>

        {!subscription || subscription.status !== 'active' ? (
          <SubscriptionCard
            userEmail={user?.email ?? ''}
            status={subscription?.status ?? null}
            nextBillingDate={subscription?.nextBillingDate ?? null}
            onSubscribe={handleSubscribe}
          />
        ) : null}

        {isLoading ? (
          <p className="text-white">Loading media...</p>
        ) : (
          <MediaRow
            title="Your Media Library"
            media={mediaList.map((m) => ({
              id: m.id,
              title: m.name,
              thumbnail_url: m.thumbnail,
              rating: m.rating,
            }))}
            onMediaClick={handleMediaClick}
          />
        )}

        {selectedMedia && (
          <MediaDetailModal
            isOpen={!!selectedMedia}
            media={{
              title: selectedMedia.name,
              description: selectedMedia.category,
              thumbnail_url: selectedMedia.thumbnail,
              rating: selectedMedia.rating,
              runtime: selectedMedia.runtime,
              category: selectedMedia.category,
            }}
            onClose={() => setSelectedMedia(null)}
            onPlay={handlePlay}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
