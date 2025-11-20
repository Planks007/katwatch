import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { AuthModal } from "./components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { MediaCard } from "./components/MediaCard";

const queryClient = new QueryClient();

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  category: "movie" | "series";
}

// Example static media list
const mediaList: MediaItem[] = [
  { id: "1", title: "Action Movie", thumbnail: "/img/action1.jpg", category: "movie" },
  { id: "2", title: "Comedy Show", thumbnail: "/img/comedy1.jpg", category: "series" },
  { id: "3", title: "Drama Series", thumbnail: "/img/drama1.jpg", category: "series" },
  { id: "4", title: "Thriller Movie", thumbnail: "/img/thriller1.jpg", category: "movie" },
];

const App = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"movies" | "series">("movies");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {!user && (
                      <div className="text-center mt-20">
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="bg-orange-600 px-6 py-3 rounded-lg hover:bg-orange-700 text-white"
                        >
                          Sign In / Sign Up
                        </button>
                      </div>
                    )}

                    {user && (
                      <div className="bg-zinc-900 min-h-screen text-white p-4">
                        <header className="flex justify-between items-center mb-6">
                          <h1 className="text-3xl font-bold">KatWatch</h1>
                          <button
                            onClick={signOut}
                            className="bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700"
                          >
                            Sign Out
                          </button>
                        </header>

                        <nav className="flex gap-4 mb-6">
                          <button
                            className={`px-4 py-2 rounded-lg ${
                              activeTab === "movies" ? "bg-orange-600" : "bg-zinc-800"
                            }`}
                            onClick={() => setActiveTab("movies")}
                          >
                            Movies
                          </button>
                          <button
                            className={`px-4 py-2 rounded-lg ${
                              activeTab === "series" ? "bg-orange-600" : "bg-zinc-800"
                            }`}
                            onClick={() => setActiveTab("series")}
                          >
                            Series
                          </button>
                        </nav>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {mediaList
                            .filter((item) => item.category === activeTab)
                            .map((media) => (
                              <MediaCard key={media.id} media={media} userEmail={user.email} />
                            ))}
                        </div>
                      </div>
                    )}

                    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                  </>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
