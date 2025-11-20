// src/pages/Index.tsx
import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/media/MediaRow';
import { MediaDetailModal } from '@/components/media/MediaDetailModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/supabaseClient';

interface Media {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
  description: string;
  runtime: number;
  category: string;
  stream_url?: string; // Optional; used only if user has subscription
}

export default function Index() {
  const { user } = useAuth();
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  // Fetch media (replace with actual API call)
  const fetchMedia = async () => {
    // Example stub
    const data: Media[] = [
      {
        id: '1',
        title: 'Sample Movie 1',
        thumbnail_url: '/thumbnails/movie1.jpg',
        rating: 4.5,
        description: 'Sample description for Movie 1',
        runtime: 120,
        category: 'Action',
      },
      {
        id: '2',
        title: 'Sample Movie 2',
        thumbnail_url: '/thumbnails/movie2.jpg',
        rating: 4.0,
        description: 'Sample description for Movie 2',
        runtime: 90,
        category: 'Comedy',
      },
    ];
    setMediaList(data);
  };

  // Check user subscription status from Supabase
  const checkSubscription = async () => {
    if (!user) {
      setSubscriptionActive(false);
      return;
    }
    const { data } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .single();

    setSubscriptionActive(data?.status === 'active');
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    checkSubscription();
  }, [user]);

  const handleMediaClick = (id: string) => {
    const media = mediaList.find((m) => m.id === id) || null;
    setSelectedMedia(media);
  };

  const handleCloseModal = () => setSelectedMedia(null);

  const handlePlay = () => {
    if (!subscriptionActive) return alert('You need an active subscription to play this content.');
    // TODO: navigate to player or open stream URL
    alert(`Playing ${selectedMedia?.title}...`);
  };

  return (
    <div className="px-4 md:px-8">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to KatWatch</h1>

      <MediaRow title="Featured" media={mediaList} onMediaClick={handleMediaClick} />

      <MediaDetailModal
        isOpen={!!selectedMedia}
        media={selectedMedia}
        onClose={handleCloseModal}
        onPlay={handlePlay}
      />
    </div>
  );
}
