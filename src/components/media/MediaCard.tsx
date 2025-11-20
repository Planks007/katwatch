import React from 'react';
import { MediaItem } from '@/services/ResellerService';

interface MediaCardProps {
  title: string;
  thumbnail: string;
  rating: number;
  onClick: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ title, thumbnail, rating, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-sm font-bold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
