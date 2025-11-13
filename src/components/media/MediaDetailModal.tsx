import React from 'react';

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
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ isOpen, onClose, media, onPlay }) => {
  if (!isOpen || !media) return null;

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
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {media.rating}
            </span>
            <span>{media.runtime} min</span>
            <span className="px-3 py-1 bg-orange-600 rounded text-sm">{media.category}</span>
          </div>

          <p className="text-white/80 text-lg mb-8">{media.description}</p>

          <button
            onClick={onPlay}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};
