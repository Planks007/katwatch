// src/components/media/MediaRow.tsx
import React from 'react';

interface MediaItem {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
}

interface MediaRowProps {
  title: string;
  media: MediaItem[];
  onMediaClick: (id: string) => void;
}

const MediaRow: React.FC<MediaRowProps> = ({ title, media, onMediaClick }) => {
  if (!media || media.length === 0) return <p className="text-white">No media available.</p>;

  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <div className="media-row flex gap-4 overflow-x-auto py-2">
        {media.map((item) => (
          <div
            key={item.id}
            className="media-card cursor-pointer w-48 flex-shrink-0"
            onClick={() => onMediaClick(item.id)}
          >
            <img
              src={item.thumbnail_url}
              alt={item.title}
              className="rounded-lg w-full h-28 object-cover"
            />
            <h3 className="text-sm font-semibold mt-1 text-white">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaRow;
