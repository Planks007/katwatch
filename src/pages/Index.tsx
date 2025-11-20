import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/media/MediaRow';
import { MediaDetailModal } from '@/components/media/MediaDetailModal';
import { ResellerService, ResellerMedia } from '@/services/ResellerService';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';

interface Media {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
  description: string;
  runtime: number;
  category: string;
  stream_url?: string;
}

const Index: React.FC = () => {
  const { user, subscriptionActive } = useAuth();
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      if (!user) {
        setMediaList([]);
        return;
      }

      const streams: ResellerMedia[] = await ResellerService.getUserStreams(user.id);

      const mapped: Media[] = streams.map((s) => ({
        id: s.id,
        title: s.name,
        thumbnail_url: s.thumbnail,
        rating: s.rating,
        description: `${s.name} - ${s.category}`,
        runtime: s.runtime,
        category: s.category,
        stream_url: subscriptionActive ? s.stream_url : undefined,
      }));

      setMediaList(mapped);
    };

    fetchMedia();
  }, [user, subscriptionActive]);

  const handleMediaClick = (id: string) => {
    const media = mediaList.find((m) => m.id === id);
    if (!media) return;
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const handlePlay = () => {
    if (!selectedMedia?.stream_url) {
      alert('You must subscribe to play this content.');
      return;
    }
    window.location.href = selectedMedia.stream_url; // or route to player component
  };

  const handleSubscribe = () => {
    // Trigger your subscription flow here
    alert('Redirecting to subscription checkout...');
  };

  return (
    <div className="px-4 md:px-8">
      <SubscriptionCard
        status={subscriptionActive ? 'active' : null}
        nextBillingDate={subscriptionActive ? user?.subscriptionNextBilling : null}
        onSubscribe={handleSubscribe}
      />

      {mediaList.length > 0 && (
        <MediaRow title="All Content" media={mediaList} onMediaClick={handleMediaClick} />
      )}

      <MediaDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        media={selectedMedia}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Index;
