
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trophy, Shield, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeCard, { Challenge } from '@/components/ChallengeCard';
import { mockChallenges } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

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
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Arena Challenges</h1>
          <p className="text-gray-400">Join existing challenges or create your own duel</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant={filterType === null ? "default" : "outline"}
            className={filterType === null ? "bg-gray-700" : ""}
            onClick={() => setFilterType(null)}
          >
            All
          </Button>
          <Button
            variant={filterType === "Ranked" ? "default" : "outline"}
            className={filterType === "Ranked" ? "bg-neon-red" : ""}
            onClick={() => setFilterType("Ranked")}
          >
            <Trophy size={16} className="mr-1" />
            Ranked
          </Button>
          <Button
            variant={filterType === "Casual" ? "default" : "outline"}
            className={filterType === "Casual" ? "bg-neon-blue" : ""}
            onClick={() => setFilterType("Casual")}
          >
            <Shield size={16} className="mr-1" />
            Casual
          </Button>
          <Button
            variant={filterType === "Tournament" ? "default" : "outline"}
            className={filterType === "Tournament" ? "bg-neon-orange" : ""}
            onClick={() => setFilterType("Tournament")}
          >
            <Trophy size={16} className="mr-1" />
            Tournament
          </Button>
          
          <Dialog open={createDuelOpen} onOpenChange={setCreateDuelOpen}>
            <DialogTrigger asChild>
              <Button className="bg-neon-blue hover:bg-neon-blue/80 ml-2">
                <Plus size={16} className="mr-1" />
                Create Duel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black/90 border border-white/10 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create Duel</DialogTitle>
              </DialogHeader>

              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select Asset</label>
                  <Tabs defaultValue="ETH" className="w-full" onValueChange={setDuelAsset}>
                    <TabsList className="grid grid-cols-4 mb-2">
                      <TabsTrigger value="ETH">ETH</TabsTrigger>
                      <TabsTrigger value="BTC">BTC</TabsTrigger>
                      <TabsTrigger value="SOL">SOL</TabsTrigger>
                      <TabsTrigger value="AVAX">AVAX</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ETH" className="mt-0">
                      <div className="glass-panel p-3 rounded flex justify-between items-center">
                        <div className="font-mono">ETH/USD</div>
                        <div className="text-neon-blue">$3,245.78</div>
                      </div>
                    </TabsContent>
                    <TabsContent value="BTC" className="mt-0">
                      <div className="glass-panel p-3 rounded flex justify-between items-center">
                        <div className="font-mono">BTC/USD</div>
                        <div className="text-neon-blue">$52,136.42</div>
                      </div>
                    </TabsContent>
                    <TabsContent value="SOL" className="mt-0">
                      <div className="glass-panel p-3 rounded flex justify-between items-center">
                        <div className="font-mono">SOL/USD</div>
                        <div className="text-neon-blue">$142.27</div>
                      </div>
                    </TabsContent>
                    <TabsContent value="AVAX" className="mt-0">
                      <div className="glass-panel p-3 rounded flex justify-between items-center">
                        <div className="font-mono">AVAX/USD</div>
                        <div className="text-neon-blue">$36.82</div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">Stake Amount (ETH)</label>
                    <span className="text-neon-blue font-mono">{duelStake.toFixed(2)} ETH</span>
                  </div>
                  <Slider
                    defaultValue={[0.1]}
                    max={2}
                    min={0.01}
                    step={0.01}
                    onValueChange={(value) => setDuelStake(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.01 ETH</span>
                    <span>2.00 ETH</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">Timeframe (minutes)</label>
                    <span className="text-neon-orange font-mono">{duelTimeframe} min</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={15}
                    min={1}
                    step={1}
                    onValueChange={(value) => setDuelTimeframe(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>1 min</span>
                    <span>15 min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="zkMode"
                      checked={zkMode}
                      onChange={(e) => setZkMode(e.target.checked)}
                      className="rounded bg-gray-800 border-gray-600 focus:ring-neon-blue"
                    />
                    <label htmlFor="zkMode" className="text-sm font-medium text-gray-300">
                      ZK Submission
                    </label>
                  </div>
                  <div className="text-xs text-gray-400">
                    (Hide your prediction)
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-neon-orange hover:bg-neon-orange/80 py-6 text-lg font-bold animate-pulse"
                  onClick={handleCreateDuel}
                >
                  Launch Duel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onJoin={handleJoinChallenge}
          />
        ))}
        
        {filteredChallenges.length === 0 && (
          <div className="col-span-full flex items-center justify-center h-60 glass-panel rounded-lg">
            <div className="text-center">
              <p className="text-lg text-gray-400 mb-4">No active challenges found</p>
              <Button className="bg-neon-blue hover:bg-neon-blue/80" onClick={() => setCreateDuelOpen(true)}>
                <Plus size={16} className="mr-1" />
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
