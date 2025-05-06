import React from 'react';
import Avatar from '@/components/Avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Shield, Flame } from 'lucide-react';

const Profile = () => {
  // Dummy profile data
  const profile = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    avatar: '/placeholder.svg',
    username: 'zkWarrior',
    joinedDate: 'May 2025',
    stats: {
      wins: 32,
      losses: 12,
      xpLevel: 15,
      currentStreak: 5,
      bestStreak: 8
    },
    achievements: [
      { id: 1, name: 'Mind Reader', description: 'Predict 5 trades correctly in a row', icon: Trophy },
      { id: 2, name: '5x Streak', description: 'Win 5 duels in a row', icon: Flame },
      { id: 3, name: 'ZK Ninja', description: 'Win 10 ZK-protected duels', icon: Shield },
    ],
    recentMatches: [
      { id: 1, opponent: '0x3a2b...4e6f', result: 'win', asset: 'ETH/USD', stake: '0.2 ETH', time: '2h ago' },
      { id: 2, opponent: '0x7e8f...9a0b', result: 'loss', asset: 'BTC/USD', stake: '0.1 ETH', time: '5h ago' },
      { id: 3, opponent: '0x1c2d...3e4f', result: 'win', asset: 'SOL/USD', stake: '0.15 ETH', time: '1d ago' },
      { id: 4, opponent: '0x5g6h...7i8j', result: 'win', asset: 'ETH/USD', stake: '0.5 ETH', time: '2d ago' },
      { id: 5, opponent: '0x9k0l...1m2n', result: 'win', asset: 'AVAX/USD', stake: '0.3 ETH', time: '3d ago' },
    ]
  };
  
  // Calculate win rate
  const winRate = Math.floor((profile.stats.wins / (profile.stats.wins + profile.stats.losses)) * 100);
  const totalXP = profile.stats.xpLevel * 100;
  const nextLevelXP = (profile.stats.xpLevel + 1) * 100;
  const currentXP = 65; // Dummy value between 0-100
  
  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="glass-panel rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar 
              image={profile.avatar}
              address={profile.address}
              size="xl"
              glowColor="blue"
              className="shrink-0"
            />
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-gray-400 text-sm mb-3">
                  {profile.address.slice(0, 6)}...{profile.address.slice(-4)} · Joined {profile.joinedDate}
                </p>
                <Badge variant="outline" className="bg-neon-blue/10 text-neon-blue border-neon-blue/30">Level {profile.stats.xpLevel}</Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="glass-panel p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Win Rate</p>
                  <p className="text-2xl font-bold text-neon-blue">{winRate}%</p>
                </div>
                <div className="glass-panel p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Wins</p>
                  <p className="text-2xl font-bold text-green-400">{profile.stats.wins}</p>
                </div>
                <div className="glass-panel p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Losses</p>
                  <p className="text-2xl font-bold text-red-400">{profile.stats.losses}</p>
                </div>
                <div className="glass-panel p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-xs">Current Streak</p>
                  <p className="text-2xl font-bold text-neon-orange">{profile.stats.currentStreak}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>XP: {totalXP + currentXP}/{nextLevelXP}</span>
              <span>{currentXP}%</span>
            </div>
            <Progress value={currentXP} className="h-2 bg-gray-800" />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches" className="mt-0">
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-sm text-gray-400">Opponent</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-400">Asset</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-400">Stake</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-400">Result</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.recentMatches.map((match) => (
                    <tr key={match.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">{match.opponent}</td>
                      <td className="p-4 font-mono text-sm">{match.asset}</td>
                      <td className="p-4 text-neon-blue">{match.stake}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs ${
                          match.result === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {match.result.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{match.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <div className="grid gap-4">
            {profile.achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="glass-panel p-4 rounded-lg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-orange/20 flex items-center justify-center">
                    <Icon size={24} className="text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
            
            <div className="glass-panel p-4 rounded-lg flex items-center gap-4 opacity-40">
              <div className="w-12 h-12 rounded-full bg-gray-700/20 flex items-center justify-center">
                <Award size={24} className="text-gray-500" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Market Maker</h3>
                <p className="text-sm text-gray-400">Create 10 duels that other players join</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
