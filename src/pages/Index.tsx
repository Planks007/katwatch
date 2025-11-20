import React, { useState } from "react";
import { MediaRow } from "@/components/media/MediaRow";
import { MediaDetailModal } from "@/components/media/MediaDetailModal";

interface IndexProps {
  userEmail: string | null;
}

const Index: React.FC<IndexProps> = ({ userEmail }) => {
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMediaClick = (media: any) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  // Replace with your actual media data
  const movies = [
    { id: "1", title: "Movie 1", thumbnail_url: "/thumb1.jpg", rating: 8.5, description: "Desc", runtime: 120, category: "Action" },
    { id: "2", title: "Movie 2", thumbnail_url: "/thumb2.jpg", rating: 7.2, description: "Desc", runtime: 95, category: "Drama" },
  ];

  return (
    <div>
      <MediaRow
        title="Movies"
        media={movies}
        onMediaClick={(id) => {
          const media = movies.find((m) => m.id === id);
          if (media) handleMediaClick(media);
        }}
      />
      <MediaDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={selectedMedia}
        userEmail={userEmail}
        onPlay={() => console.log("Play media", selectedMedia?.title)}
      />
    </div>
  );
};

export default Index;
