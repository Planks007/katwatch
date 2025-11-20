import React, { useEffect, useState } from "react";

interface MediaCardProps {
  title: string;
  thumbnail: string;
  rating: number;
  userEmail: string; // email to check subscription
  onClick: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ title, thumbnail, rating, userEmail, onClick }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getUserSubscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await res.json();
        setIsSubscribed(data.status === "active");
      } catch (err) {
        console.error("Subscription fetch failed:", err);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchSubscription();
  }, [userEmail]);

  const handleClick = () => {
    if (!isSubscribed) {
      alert("You need an active subscription to play this content.");
      return;
    }
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer transition-transform duration-300 hover:scale-105 relative ${
        !isSubscribed ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
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
        {!isSubscribed && !loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm bg-black/50 rounded-lg">
            SUBSCRIBE TO PLAY
          </div>
        )}
      </div>
    </div>
  );
};
