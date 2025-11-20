// src/components/media/MediaRow.tsx
import React, { useEffect, useState } from 'react';
import { ResellerService, ResellerMedia } from '../../services/ResellerService';

interface MediaRowProps {
  userId: string;
  onMediaClick: (media: ResellerMedia) => void; // callback to parent
}

export const MediaRow: React.FC<MediaRowProps> = ({ userId, onMediaClick }) => {
  const [mediaList, setMediaList] = useState<ResellerMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStreams() {
      setLoading(true);
      const streams = await ResellerService.getUserStreams(userId);
      setMediaList(streams);
      setLoading(false);
    }
    fetchStreams();
  }, [userId]);

  if (loading) return <p className="text-white">Loading streams...</p>;

  return (
    <div className="media-row flex gap-4 overflow-x-auto py-2">
      {mediaList.map((media) => (
        <div
          key={media.id}
          className="media-card cursor-pointer w-48 flex-shrink-0"
          onClick={() => onMediaClick(media)}
        >
          <img
            src={media.thumbnail}
            alt={media.name}
            className="rounded-lg w-full h-28 object-cover"
          />
          <h3 className="text-sm font-semibold mt-1 text-white">{media.name}</h3>
          <p className="text-xs text-gray-400">{media.category}</p>
        </div>
      ))}
    </div>
  );
};
