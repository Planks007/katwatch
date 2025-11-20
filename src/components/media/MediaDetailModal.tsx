// src/components/media/MediaDetailModal.tsx
import React from 'react';
import { ResellerMedia } from '../../services/ResellerService';

interface MediaDetailModalProps {
  media: ResellerMedia;
  onClose: () => void;
}

const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ media, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-white text-lg font-semibold mb-2">{media.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{media.category}</p>

        <video
          src={media.stream_url}
          controls
          autoPlay
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default MediaDetailModal;
