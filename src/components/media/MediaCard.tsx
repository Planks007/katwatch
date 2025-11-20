// src/components/media/MediaCard.tsx
import React from 'react';

interface MediaCardProps {
  title: string;
  thumbnail: string;
  rating: number;
  onClick: () => void;
  isSubscribed: boolean; // NEW: pass subscription status
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  thumbnail,
  rating,
  onClick,
  isSubscribed,
}) => {
  const handleClick = () => {
    if (!isSubscribed) {
      alert('You need an active subscription to play this content.');
      return;
    }
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer transition-transform duration-300 hover:scale-105 ${
        !isSubscribed ? 'opacity-50 hover:opacity-60' : ''
      }`}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-sm font-bold">{rating}</span>
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
