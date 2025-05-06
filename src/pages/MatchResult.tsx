
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowUpRight, RefreshCw } from 'lucide-react';
import Avatar from '@/components/Avatar';
import confetti from 'canvas-confetti';

const MatchResult = () => {
  const navigate = useNavigate();
  
  // Winner data (dummy)
  const winner = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    avatar: '/placeholder.svg',
    prediction: 'UP',
  };
  
  const stats = {
    accuracy: '87%',
    reward: '0.95 ETH',
    txHash: '0x3d8a7f7d5e6a2b3c1d8a7f7d5e6a2b3c1d8a7f7d',
  };
  
  // Trigger confetti effect on component mount
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Random confetti burst
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#3b82f6', '#ec4899'],
      });
      
      // Random confetti burst from other side
      confetti({
        particleCount,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: ['#4ade80', '#3b82f6', '#ec4899'],
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="glass-panel rounded-lg p-6 text-center relative overflow-hidden">
        {/* Victory badge */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-orange/20 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-neon-blue to-neon-orange opacity-30" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-6">
            <Trophy size={48} className="text-neon-orange mb-2" />
            <h1 className="text-3xl font-bold mb-2">Victory!</h1>
            <p className="text-gray-400">You won this prediction duel</p>
          </div>
          
          <div className="my-8">
            <Avatar 
              image={winner.avatar}
              address={winner.address}
              size="xl"
              glowColor="orange"
              className="mx-auto mb-4"
            />
            <div className="inline-flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              <ArrowUpRight size={16} className="mr-1" />
              <span>Predicted {winner.prediction}</span>
            </div>
          </div>
          
          <div className="grid gap-4 mb-8">
            <div className="glass-panel p-4 rounded-lg grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Prediction Accuracy</p>
                <p className="text-neon-blue text-2xl font-bold">{stats.accuracy}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Reward</p>
                <p className="text-neon-orange text-2xl font-bold">{stats.reward}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">TX Hash</p>
                <p className="text-xs text-neon-blue truncate font-mono">
                  {stats.txHash.slice(0, 10)}...
                </p>
              </div>
            </div>
            
            <p className="text-center text-gray-400 text-sm">
              This win will be added to your profile statistics
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="bg-neon-blue hover:bg-neon-blue/80"
              onClick={() => navigate('/battle')}
            >
              <RefreshCw size={16} className="mr-2" /> Rematch
            </Button>
            <Button 
              variant="outline"
              className="border-neon-orange text-neon-orange hover:bg-neon-orange/10"
              onClick={() => navigate('/arena')}
            >
              Find New Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResult;
