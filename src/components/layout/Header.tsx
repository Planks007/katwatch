import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, onProfileClick, onLogoClick }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <button onClick={onLogoClick} className="text-3xl font-bold text-orange-600 hover:text-orange-500 transition">
          KatWatch
        </button>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <button onClick={onProfileClick} className="text-white hover:text-orange-500 transition">
                Profile
              </button>
              <button
                onClick={signOut}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
