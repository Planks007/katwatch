import React, { useState } from "react";

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
    id: string;
  } | null;
  userEmail: string; // NEW: for subscription check
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ isOpen, onClose, media, userEmail }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !media) return null;

  const handlePlay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getUserStreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, mediaId: media.id }),
      });
      const data = await res.json();

      if (data.stream_url) {
        setStreamUrl(data.stream_url);
        setIsLocked(false);
      } else {
        setIsLocked(true);
      }
    } catch (err) {
      console.error(err);
      setIsLocked(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <img src={media.thumbnail_url} alt={media.title} className="w-full h-96 object-cover rounded-t-lg" />
        <button onClick={onClose} className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2">
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-4">{media.title}</h2>
          <div className="flex items-center gap-4 mb-6 text-white/80">
            <span className="flex items-center gap-1">{media.rating} ★</span>
            <span>{media.runtime} min</span>
            <span className="px-3 py-1 bg-orange-600 rounded text-sm">{media.category}</span>
          </div>
          <p className="text-white/80 text-lg mb-8">{media.description}</p>

          <button
            onClick={handlePlay}
            disabled={loading}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Play Now"}
          </button>

          {isLocked && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg text-white font-bold text-center text-lg">
              Subscribe to Watch
            </div>
          )}

          {streamUrl && !isLocked && (
            <video controls autoPlay className="w-full mt-4 rounded-lg">
              <source src={streamUrl} type="application/x-mpegURL" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};
