import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69158e4e2d54d14478a8e74b_1763020719785_90dd9566.webp"
          alt="KatWatch Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Stream Unlimited Entertainment
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Watch thousands of movies and series. Only R89/month.
          </p>
          <button
            onClick={onGetStarted}
            className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold rounded-lg transition transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
