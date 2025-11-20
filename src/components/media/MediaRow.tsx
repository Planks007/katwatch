import React from "react";
import { MediaCard } from "./MediaCard";

interface Media {
  id: string;
  title: string;
  thumbnail_url: string;
  rating: number;
}

interface MediaRowProps {
  title: string;
  media: Media[];
  onMediaClick: (media: Media) => void;
  userEmail: string | null; // Add userEmail here
}

export const MediaRow: React.FC<MediaRowProps> = ({ title, media, onMediaClick, userEmail }) => {
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
                userEmail={userEmail} // Pass down userEmail
                onClick={() => onMediaClick(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
