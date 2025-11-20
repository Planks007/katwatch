// src/pages/Index.tsx
import React, { useEffect, useState } from 'react';
import { ResellerService, ResellerMedia } from '@/services/ResellerService';
import { MediaRow } from '@/components/media/MediaRow';
import { MediaDetailModal } from '@/components/media/MediaDetailModal';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, subscriptionStatus } = useAuth();
  const [streams, setStreams] = useState<ResellerMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<ResellerMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      ResellerService.getUserStreams(user.id).then(setStreams);
    }
  }, [user]);

  const handleMediaClick = (id: string) => {
    const media = streams.find((m) => m.id === id) || null;
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handlePlay = () => {
    if (subscriptionStatus !== 'active') {
      alert('You must have an active subscription to play this content.');
      return;
    }
    if (selectedMedia?.stream_url) {
      window.location.href = selectedMedia.stream_url; // Or use a player component
    }
  };

  return (
    <div className="p-4">
      <SubscriptionCard
        status={subscriptionStatus}
        nextBillingDate={user?.nextBillingDate || null}
        onSubscribe={() => alert('Redirect to subscription checkout')}
      />

      <MediaRow
        title="All Media"
        media={streams.map((s) => ({
          id: s.id,
          title: s.title,
          thumbnail_url: s.thumbnail_url,
          rating: s.rating,
        }))}
        onMediaClick={handleMediaClick}
      />

      <MediaDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={selectedMedia && {
          title: selectedMedia.title,
          description: selectedMedia.description || 'No description',
          thumbnail_url: selectedMedia.thumbnail_url,
          rating: selectedMedia.rating,
          runtime: selectedMedia.runtime,
          category: selectedMedia.category,
        }}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Index;
