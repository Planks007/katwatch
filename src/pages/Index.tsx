// src/pages/Index.tsx
import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/MediaRow.tsx';
import { MediaDetailModal } from '@/components/MediaDetailModal.tsx';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard.tsx';
import { getUserSubscription } from '@/services/getUserSubscription.ts';
import { createUserSubscription } from '@/services/createUserSubscription.ts';
import { useAuth } from '@/contexts/AuthContext';

// Example media data (replace with your actual API or DB)
const mockMovies = [
  { id: '1', title: 'Movie 1', thumbnail_url: '/assets/movie1.jpg', rating: 8 },
  { id: '2', title: 'Movie 2', thumbnail_url: '/assets/movie2.jpg', rating: 7 },
];

export default function Index() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<{ status: string; nextBillingDate: string } | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
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
    const media = mockMovies.find((m) => m.id === mediaId);
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
    alert(`Playing ${selectedMedia.title}...`);
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
        title="Movies"
        media={mockMovies}
        onMediaClick={handleMediaClick}
      />

      {/* Media Detail Modal */}
      <MediaDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        media={selectedMedia}
        onPlay={handlePlay}
      />
    </div>
  );
}
