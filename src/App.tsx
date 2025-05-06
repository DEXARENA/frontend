
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import LandingPage from "./pages/LandingPage";
import Arena from "./pages/Arena";
import BattlePage from "./pages/BattlePage";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import MatchResult from "./pages/MatchResult";
import NotFound from "./pages/NotFound";
import Onboarding from "./components/Onboarding";

// Set up React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if the user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem("dexarena-onboarding-completed");
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("dexarena-onboarding-completed", "true");
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/battle" element={<BattlePage />} />
                <Route path="/result" element={<MatchResult />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <MobileNav />
          </div>
          {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
