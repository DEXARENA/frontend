
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trophy, Shield, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeCardCompact from '@/components/ChallengeCardCompact';
import type { Challenge } from '@/components/ChallengeCardCompact';
import { mockChallenges } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Arena = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [createDuelOpen, setCreateDuelOpen] = useState(false);
  const [duelAsset, setDuelAsset] = useState("ETH");
  const [duelStake, setDuelStake] = useState(0.1);
  const [duelTimeframe, setDuelTimeframe] = useState(5);
  const [zkMode, setZkMode] = useState(false);

  const handleJoinChallenge = (challengeId: string) => {
    // Find the challenge
    const challenge = challenges.find(c => c.id === challengeId);

    if (challenge) {
      toast({
        title: "Challenge Accepted!",
        description: `You joined ${challenge.creator.address.slice(0, 6)}...${challenge.creator.address.slice(-4)}'s ${challenge.type} challenge.`,
        variant: "default",
      });

      // Navigate to battle page
      navigate('/battle');
    }
  };

  const handleCreateDuel = () => {
    // Create a new challenge/duel
    toast({
      title: "Duel Created!",
      description: `Your ${duelAsset} duel for ${duelStake} ETH has been created. Waiting for opponents...`,
      variant: "default",
    });

    setCreateDuelOpen(false);

    // Add the new challenge to the list
    const newChallenge: Challenge = {
      id: `new-${Date.now()}`,
      creator: {
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: '/placeholder.svg',
      },
      type: 'Ranked',
      stake: {
        amount: duelStake.toString(),
        token: 'ETH'
      },
      expiresIn: duelTimeframe * 60, // Convert minutes to seconds
      createdAt: new Date().toISOString()
    };

    setChallenges([newChallenge, ...challenges]);
  };

  const filteredChallenges = filterType
    ? challenges.filter(c => c.type === filterType)
    : challenges;

  return (
    <div className="container px-2 sm:px-4 py-4 sm:py-6 max-w-7xl">
      {/* Header section with title and create button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Arena Challenges</h1>
          <p className="text-xs sm:text-sm text-gray-400">Join existing challenges or create your own duel</p>
        </div>

        <Dialog open={createDuelOpen} onOpenChange={setCreateDuelOpen}>
          <DialogTrigger asChild>
            <Button className="bg-neon-blue hover:bg-neon-blue/80 h-8 text-xs px-3 rounded-full">
              <Plus size={14} className="mr-1" />
              Create Duel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[350px] bg-black/95 border border-neon-blue/20 backdrop-blur-xl rounded-xl p-4">
            <div className="absolute -z-10 top-0 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 rounded-full filter blur-3xl" />
            <div className="absolute -z-10 bottom-0 right-1/4 w-1/2 h-1/2 bg-neon-orange/10 rounded-full filter blur-3xl" />

            <DialogHeader className="pb-2 mb-3 border-b border-white/10">
              <DialogTitle className="text-lg font-bold text-center">Create Duel</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              {/* Asset Selection */}
              <div className="glass-panel p-3 rounded-lg border border-white/10">
                <label htmlFor="asset-select" className="text-xs font-medium text-gray-300 mb-1.5 block">Asset</label>
                <div className="relative">
                  <select
                    id="asset-select"
                    value={duelAsset}
                    onChange={(e) => setDuelAsset(e.target.value)}
                    className="w-full p-1.5 rounded bg-gray-800/50 border border-white/10 text-white appearance-none pr-8 text-sm"
                  >
                    <option value="ETH">ETH/USD - $3,245.78</option>
                    <option value="BTC">BTC/USD - $52,136.42</option>
                    <option value="SOL">SOL/USD - $142.27</option>
                    <option value="AVAX">AVAX/USD - $36.82</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stake and Time */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stake Amount */}
                <div className="glass-panel p-3 rounded-lg border border-white/10">
                  <label htmlFor="stake-input" className="text-xs font-medium text-gray-300 mb-1.5 block">Stake</label>
                  <div className="flex">
                    <Input
                      id="stake-input"
                      type="number"
                      value={duelStake}
                      onChange={(e) => setDuelStake(Number.parseFloat(e.target.value) || 0)}
                      min={0.01}
                      max={2}
                      step={0.01}
                      className="bg-gray-800/50 border-white/10 h-7 text-sm"
                    />
                    <div className="bg-gray-800/80 px-2 flex items-center justify-center rounded-r border border-l-0 border-white/10 min-w-[40px]">
                      <span className="text-neon-blue text-xs font-mono">{duelAsset}</span>
                    </div>
                  </div>
                </div>

                {/* Timeframe */}
                <div className="glass-panel p-3 rounded-lg border border-white/10">
                  <label htmlFor="timeframe-input" className="text-xs font-medium text-gray-300 mb-1.5 block">Time</label>
                  <div className="flex">
                    <Input
                      id="timeframe-input"
                      type="number"
                      value={duelTimeframe}
                      onChange={(e) => setDuelTimeframe(Number.parseInt(e.target.value) || 1)}
                      min={1}
                      max={30}
                      step={1}
                      className="bg-gray-800/50 border-white/10 h-7 text-sm"
                    />
                    <div className="bg-gray-800/80 px-2 flex items-center justify-center rounded-r border border-l-0 border-white/10 min-w-[40px]">
                      <span className="text-neon-orange text-xs font-mono">min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ZK Mode */}
              <div className="flex items-center justify-between bg-gray-800/30 p-2 rounded-lg border border-white/5">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="zkMode"
                    checked={zkMode}
                    onChange={(e) => setZkMode(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-600 focus:ring-neon-blue h-3 w-3"
                  />
                  <label htmlFor="zkMode" className="text-xs font-medium text-gray-300">
                    ZK Submission
                  </label>
                </div>
                <div className="text-[10px] text-gray-400">
                  Hide prediction
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-800/30 p-2 rounded-lg border border-white/5 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Your stake:</span>
                  <span className="text-neon-blue font-mono">{duelStake.toFixed(2)} {duelAsset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Potential reward:</span>
                  <span className="text-neon-green font-mono">{(duelStake * 2).toFixed(2)} {duelAsset}</span>
                </div>
              </div>

              {/* Launch Button */}
              <Button
                className="w-full bg-gradient-to-r from-neon-orange to-neon-red hover:from-neon-orange/90 hover:to-neon-red/90 h-9 text-sm font-bold rounded-lg mt-2"
                onClick={handleCreateDuel}
              >
                Launch Duel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and search section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filterType === null ? "default" : "outline"}
            className={`h-8 text-xs px-3 ${filterType === null ? "bg-gray-700" : ""}`}
            onClick={() => setFilterType(null)}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filterType === "Ranked" ? "default" : "outline"}
            className={`h-8 text-xs px-3 ${filterType === "Ranked" ? "bg-neon-red" : ""}`}
            onClick={() => setFilterType("Ranked")}
          >
            <Trophy size={14} className="mr-1" />
            Ranked
          </Button>
          <Button
            size="sm"
            variant={filterType === "Casual" ? "default" : "outline"}
            className={`h-8 text-xs px-3 ${filterType === "Casual" ? "bg-neon-blue" : ""}`}
            onClick={() => setFilterType("Casual")}
          >
            <Shield size={14} className="mr-1" />
            Casual
          </Button>
          <Button
            size="sm"
            variant={filterType === "Tournament" ? "default" : "outline"}
            className={`h-8 text-xs px-3 ${filterType === "Tournament" ? "bg-neon-orange" : ""}`}
            onClick={() => setFilterType("Tournament")}
          >
            <Trophy size={14} className="mr-1" />
            Tournament
          </Button>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search challenges..."
            className="pl-8 h-8 text-xs bg-gray-800/50 border-gray-700 w-full sm:w-[200px]"
          />
        </div>
      </div>

      {/* Challenge cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredChallenges.map((challenge) => (
          <ChallengeCardCompact
            key={challenge.id}
            challenge={challenge}
            onJoin={handleJoinChallenge}
          />
        ))}

        {filteredChallenges.length === 0 && (
          <div className="col-span-full flex items-center justify-center h-32 glass-panel rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">No active challenges found</p>
              <Button
                size="sm"
                className="bg-neon-blue hover:bg-neon-blue/80 h-7 text-xs"
                onClick={() => setCreateDuelOpen(true)}
              >
                <Plus size={12} className="mr-1" />
                Create Duel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;
