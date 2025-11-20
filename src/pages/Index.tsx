// src/pages/Index.tsx
import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/MediaRow.tsx';
import { MediaDetailModal } from '@/components/MediaDetailModal.tsx';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { getUserSubscription } from '@/services/getUserSubscription.ts';
import { createUserSubscription } from '@/services/createUserSubscription.ts';
import { ResellerService } from '@/services/ResellerService.ts';

// Media type returned by reseller
interface ResellerMedia {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  description: string;
  runtime: number;
  category: string;
  streamUrl: string;
}

export default function Index() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<{ status: string; nextBillingDate: string } | null>(null);
  const [mediaList, setMediaList] = useState<ResellerMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<ResellerMedia | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user subscription on load
  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.email) return;
      const sub = await getUserSubscription(user.email);
      setSubscription(sub);
    }
    fetchSubscription();
  }, [user]);

  // Fetch streams from reseller panel
  useEffect(() => {
    async function fetchStreams() {
      if (!user) return;
      try {
        const streams = await ResellerService.getUserStreams(user.email);
        setMediaList(streams);
      } catch (err: any) {
        console.error('Failed to fetch streams:', err.message);
      }
    }
    fetchStreams();
  }, [user]);

  // Handle subscription creation
  const handleSubscribe = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const newSub = await createUserSubscription(user.email);
      setSubscription(newSub);
    } catch (err: any) {
      console.error('Subscription creation failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle media card click
  const handleMediaClick = (mediaId: string) => {
    const media = mediaList.find((m) => m.id === mediaId);
    if (!media) return;
    setSelectedMedia(media);
    setModalOpen(true);
  };

  // Handle play button
  const handlePlay = () => {
    if (!subscription || subscription.status !== 'active') {
      alert('You need an active subscription to play this content.');
      return;
    }
    alert(`Playing ${selectedMedia?.title} at ${selectedMedia?.streamUrl}`);
    // TODO: replace with actual player logic
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 md:p-8">
      {/* Subscription Card */}
      <SubscriptionCard
        status={subscription?.status || null}
        nextBillingDate={subscription?.nextBillingDate || null}
        onSubscribe={handleSubscribe}
      />

      {/* Media Rows */}
      <MediaRow
        title="Available Media"
        media={mediaList.map(m => ({
          id: m.id,
          title: m.title,
          thumbnail_url: m.thumbnail,
          rating: m.rating
        }))}
        onMediaClick={handleMediaClick}
      />

      {/* Media Detail Modal */}
      <MediaDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        media={selectedMedia ? {
          title: selectedMedia.title,
          description: selectedMedia.description,
          thumbnail_url: selectedMedia.thumbnail,
          rating: selectedMedia.rating,
          runtime: selectedMedia.runtime,
          category: selectedMedia.category
        } : null}
        onPlay={handlePlay}
      />
    </div>
  );
}
