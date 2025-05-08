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
    <div className="container px-2 py-4 max-w-3xl mx-auto">
      <div className="mb-4">
        <div className="glass-panel rounded-lg p-3 sm:p-4">
          {/* Header with username and level */}
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg font-bold">{profile.username}</h1>
                <p className="text-gray-400 text-xs">
                  {profile.address.slice(0, 6)}...{profile.address.slice(-4)}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-neon-blue/10 text-neon-blue border-neon-blue/30 text-xs">Lvl {profile.stats.xpLevel}</Badge>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="glass-panel p-2 rounded-lg text-center">
              <p className="text-gray-400 text-[10px]">Win Rate</p>
              <p className="text-lg font-bold text-neon-blue">{winRate}%</p>
            </div>
            <div className="glass-panel p-2 rounded-lg text-center">
              <p className="text-gray-400 text-[10px]">Wins</p>
              <p className="text-lg font-bold text-green-400">{profile.stats.wins}</p>
            </div>
            <div className="glass-panel p-2 rounded-lg text-center">
              <p className="text-gray-400 text-[10px]">Losses</p>
              <p className="text-lg font-bold text-red-400">{profile.stats.losses}</p>
            </div>
            <div className="glass-panel p-2 rounded-lg text-center">
              <p className="text-gray-400 text-[10px]">Streak</p>
              <p className="text-lg font-bold text-neon-orange">{profile.stats.currentStreak}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">XP: {totalXP + currentXP}/{nextLevelXP}</span>
              <span className="text-neon-blue">{currentXP}%</span>
            </div>
            <Progress value={currentXP} className="h-1.5 bg-gray-800" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-3 h-8">
          <TabsTrigger value="matches" className="text-xs">Recent Matches</TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="mt-0">
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/20">
                    <th className="text-left p-2 font-medium text-xs text-gray-400">Result</th>
                    <th className="text-left p-2 font-medium text-xs text-gray-400">Asset</th>
                    <th className="text-left p-2 font-medium text-xs text-gray-400">Stake</th>
                    <th className="text-right p-2 font-medium text-xs text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.recentMatches.map((match) => (
                    <tr key={match.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-2">
                        <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] ${
                          match.result === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {match.result.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2 font-mono text-xs">{match.asset}</td>
                      <td className="p-2 text-neon-blue text-xs">{match.stake}</td>
                      <td className="p-2 text-xs text-gray-400 text-right">{match.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <div className="grid gap-2">
            {profile.achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="glass-panel p-2 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-orange/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-neon-orange" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm">{achievement.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{achievement.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="glass-panel p-2 rounded-lg flex items-center gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full bg-gray-700/20 flex items-center justify-center shrink-0">
                <Award size={16} className="text-gray-500" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm">Market Maker</h3>
                <p className="text-xs text-gray-400 truncate">Create 10 duels that other players join</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
