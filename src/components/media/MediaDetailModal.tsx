import React, { useState, useEffect } from 'react';
import { MediaItem, ResellerService } from '@/services/ResellerService';

interface MediaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem | null;
  userEmail: string;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ isOpen, onClose, media, userEmail }) => {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!media) return;
    async function checkAccess() {
      const url = await ResellerService.getStreamUrlForUser(userEmail, media.id);
      setCanPlay(!!url);
    }
    checkAccess();
  }, [media, userEmail]);

  if (!isOpen || !media) return null;

  const handlePlay = () => {
    if (!canPlay) return alert('Subscribe to play this content.');
    window.location.href = `player?url=${encodeURIComponent(media.id)}`; // Example player route
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img src={media.thumbnail_url} alt={media.title} className="w-full h-96 object-cover rounded-t-lg" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-4">{media.title}</h2>
          <p className="text-white/80 text-lg mb-8">{media.description}</p>
          <button
            onClick={handlePlay}
            className={`px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition flex items-center gap-2 ${
              !canPlay && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};
