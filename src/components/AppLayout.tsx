import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Header } from './layout/Header';
import { Hero } from './layout/Hero';
import { MediaRow } from './media/MediaRow';
import { AuthModal } from './auth/AuthModal';
import { MediaDetailModal } from './media/MediaDetailModal';
import { VideoPlayer } from './player/VideoPlayer';
import { SubscriptionCard } from './subscription/SubscriptionCard';
import { SearchBar } from './layout/SearchBar';
import { Footer } from './layout/Footer';
import { useSubscription } from '@/hooks/useSubscription';
import { mockMedia } from '@/data/mockMedia';


const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { subscription, initiatePayment } = useSubscription();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [view, setView] = useState<'home' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedia = searchQuery
    ? mockMedia.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockMedia;

  const selectedMedia = mockMedia.find(m => m.id === selectedMediaId);
  const actionMovies = filteredMedia.filter(m => m.category === 'Action');
  const dramaMovies = filteredMedia.filter(m => m.category === 'Drama');
  const comedyMovies = filteredMedia.filter(m => m.category === 'Comedy');


  const handlePlayMedia = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (subscription?.status !== 'active') {
      setView('profile');
      return;
    }
    setPlayerOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        onAuthClick={() => setAuthModalOpen(true)}
        onProfileClick={() => setView('profile')}
        onLogoClick={() => setView('home')}
      />

      {view === 'home' ? (
        <>
          <Hero onGetStarted={() => user ? setView('profile') : setAuthModalOpen(true)} />
          
          <div className="py-12">
            <SearchBar onSearch={setSearchQuery} />
            <MediaRow title="Trending Now" media={filteredMedia.slice(0, 6)} onMediaClick={setSelectedMediaId} />
            <MediaRow title="Action" media={actionMovies} onMediaClick={setSelectedMediaId} />
            <MediaRow title="Drama" media={dramaMovies} onMediaClick={setSelectedMediaId} />
            <MediaRow title="Comedy" media={comedyMovies} onMediaClick={setSelectedMediaId} />
          </div>
          
          <Footer />

        </>

      ) : (
        <div className="pt-24 pb-12 px-4">
          <SubscriptionCard
            status={subscription?.status || null}
            nextBillingDate={subscription?.next_billing_date || null}
            onSubscribe={initiatePayment}
          />
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      
      <MediaDetailModal
        isOpen={!!selectedMediaId}
        onClose={() => setSelectedMediaId(null)}
        media={selectedMedia || null}
        onPlay={handlePlayMedia}
      />

      <VideoPlayer
        isOpen={playerOpen}
        onClose={() => setPlayerOpen(false)}
        title={selectedMedia?.title || ''}
        streamUrl={selectedMedia?.stream_url || ''}
      />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default AppLayout;

