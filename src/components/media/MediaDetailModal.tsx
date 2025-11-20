import React, { useEffect, useState } from 'react';
import { getUserSubscription, SubscriptionStatus } from '@/api/getUserSubscription';

interface MediaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    title: string;
    description: string;
    thumbnail_url: string;
    rating: number;
    runtime: number;
    category: string;
  } | null;
  onPlay: () => void;
  userEmail: string | null;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ isOpen, onClose, media, onPlay, userEmail }) => {
  const [subscription, setSubscription] = useState<SubscriptionStatus>({ status: null, nextBillingDate: null });

  useEffect(() => {
    if (userEmail) {
      getUserSubscription(userEmail).then(setSubscription);
    }
  }, [userEmail]);

  if (!isOpen || !media) return null;

  const canPlay = subscription.status === 'active';

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
          
          <div className="flex items-center gap-4 mb-6 text-white/80">
            <span className="flex items-center gap-1">{media.rating}</span>
            <span>{media.runtime} min</span>
            <span className="px-3 py-1 bg-orange-600 rounded text-sm">{media.category}</span>
          </div>

          <p className="text-white/80 text-lg mb-8">{media.description}</p>

          <button
            onClick={() => canPlay ? onPlay() : alert('You need an active subscription to play this content.')}
            className={`px-8 py-4 text-white font-bold rounded-lg transition flex items-center gap-2 ${
              canPlay ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 cursor-not-allowed'
            }`}
            disabled={!canPlay}
          >
            {canPlay ? 'Play Now' : 'Subscribe to Play'}
          </button>
        </div>
      </div>
    </div>
  );
};
