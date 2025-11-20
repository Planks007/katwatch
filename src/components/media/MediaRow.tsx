// src/components/media/MediaRow.tsx
import React, { useEffect, useState } from 'react';
import { ResellerService, ResellerMedia } from '../../services/ResellerService';
import MediaDetailModal from './MediaDetailModal';

interface MediaRowProps {
  userId: string;
}

const MediaRow: React.FC<MediaRowProps> = ({ userId }) => {
  const [mediaList, setMediaList] = useState<ResellerMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<ResellerMedia | null>(null);
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

  if (loading) return <p>Loading streams...</p>;

  return (
    <div>
      <div className="media-row flex gap-4 overflow-x-auto py-2">
        {mediaList.map((media) => (
          <div
            key={media.id}
            className="media-card cursor-pointer w-48 flex-shrink-0"
            onClick={() => setSelectedMedia(media)}
          >
            <img
              src={media.thumbnail}
              alt={media.name}
              className="rounded-lg w-full h-28 object-cover"
            />
            <h3 className="text-sm font-semibold mt-1">{media.name}</h3>
            <p className="text-xs text-gray-400">{media.category}</p>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <MediaDetailModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
};

export default MediaRow;
