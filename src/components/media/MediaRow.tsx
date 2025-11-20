// src/components/media/MediaRow.tsx
import React from 'react';
import { MediaCard } from './MediaCard';

export interface Media {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
}

interface MediaRowProps {
  title: string;
  media: Media[];
  onMediaClick: (id: string) => void;
}

export const MediaRow: React.FC<MediaRowProps> = ({ title, media, onMediaClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4 md:px-8">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide px-4 md:px-8">
        <div className="flex gap-4 pb-4">
          {media.map((item) => (
            <div key={item.id} className="flex-none w-48">
              <MediaCard
                title={item.title}
                thumbnail={item.thumbnail_url}
                rating={item.rating}
                onClick={() => onMediaClick(item.id)}
                isSubscribed={userSubscriptionStatus === 'active'} // pass your subscription status
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
