import React from 'react';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  streamUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ isOpen, onClose, title, streamUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black/80">
        <h3 className="text-white font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-orange-500 transition"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-24 h-24 text-orange-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          <p className="text-white text-xl mb-2">Video Player</p>
          <p className="text-white/60">Stream URL: {streamUrl}</p>
          <p className="text-white/60 mt-4 text-sm">
            In production, this would play the actual video stream
          </p>
        </div>
      </div>
    </div>
  );
};
