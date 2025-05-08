
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Avatar from '@/components/Avatar';
import { Trophy, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState("weekly");

  // Mock leaderboard data
  const leaderboardData = {
    weekly: [
      { id: 1, username: 'zkTiger', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', avatar: '/placeholder.svg', winRate: 94, matches: 18, xp: 1240, country: 'SG' },
      { id: 2, username: 'degenX', address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t', avatar: '/placeholder.svg', winRate: 91, matches: 22, xp: 1150, country: 'JP' },
      { id: 3, username: 'CryptoPunk', address: '0x9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d', avatar: '/placeholder.svg', winRate: 88, matches: 25, xp: 1120, country: 'US' },
      { id: 4, username: 'zkWarrior', address: '0x3a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t', avatar: '/placeholder.svg', winRate: 85, matches: 20, xp: 980, country: 'DE' },
      { id: 5, username: 'BlockMaster', address: '0x5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z', avatar: '/placeholder.svg', winRate: 82, matches: 28, xp: 950, country: 'UK' },
      { id: 6, username: 'CryptoQueen', address: '0x7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r', avatar: '/placeholder.svg', winRate: 80, matches: 15, xp: 880, country: 'FR' },
      { id: 7, username: 'EthGod', address: '0x1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v', avatar: '/placeholder.svg', winRate: 77, matches: 30, xp: 820, country: 'CA' },
      { id: 8, username: 'PredictorPro', address: '0x9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t', avatar: '/placeholder.svg', winRate: 75, matches: 12, xp: 780, country: 'AU' },
      { id: 9, username: 'TokenWhale', address: '0x5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t', avatar: '/placeholder.svg', winRate: 72, matches: 18, xp: 750, country: 'KR' },
      { id: 10, username: 'SolanaKing', address: '0x0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o', avatar: '/placeholder.svg', winRate: 70, matches: 20, xp: 720, country: 'IN' },
    ],
    monthly: [
      { id: 1, username: 'CryptoPunk', address: '0x9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d', avatar: '/placeholder.svg', winRate: 92, matches: 75, xp: 3420, country: 'US' },
      { id: 2, username: 'zkTiger', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', avatar: '/placeholder.svg', winRate: 90, matches: 68, xp: 3240, country: 'SG' },
      { id: 3, username: 'BlockMaster', address: '0x5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z', avatar: '/placeholder.svg', winRate: 87, matches: 98, xp: 3150, country: 'UK' },
      // ... more monthly data
    ],
    alltime: [
      { id: 1, username: 'EthGod', address: '0x1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v', avatar: '/placeholder.svg', winRate: 95, matches: 324, xp: 12840, country: 'CA' },
      { id: 2, username: 'CryptoPunk', address: '0x9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d', avatar: '/placeholder.svg', winRate: 93, matches: 287, xp: 12420, country: 'US' },
      { id: 3, username: 'zkTiger', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', avatar: '/placeholder.svg', winRate: 91, matches: 256, xp: 11980, country: 'SG' },
      // ... more all-time data
    ]
  };

  const currentLeaderboard = leaderboardData[timeframe as keyof typeof leaderboardData];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getPodiumClass = (position: number) => {
    switch (position) {
      case 1: return "bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/50";
      case 2: return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case 3: return "bg-gradient-to-r from-amber-700/20 to-amber-800/20 border-amber-700/50";
      default: return "bg-black/30";
    }
  };

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="container px-2 py-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h1 className="text-xl font-bold flex items-center">
          <Trophy size={18} className="text-neon-orange mr-2" />
          Leaderboard
        </h1>

        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-auto h-8">
            <TabsTrigger value="weekly" className="text-xs px-3">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs px-3">Monthly</TabsTrigger>
            <TabsTrigger value="alltime" className="text-xs px-3">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black/40 to-black/20 p-3 border-b border-white/10">
          <div className="grid grid-cols-10 gap-2 text-xs text-gray-400">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">Win %</div>
            <div className="col-span-2 text-right">XP</div>
          </div>
        </div>

        <motion.div
          className="divide-y divide-white/5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentLeaderboard.map((player, index) => (
            <motion.div
              key={player.id}
              className={`grid grid-cols-10 gap-2 p-2 items-center ${getPodiumClass(index + 1)}`}
              variants={itemVariants}
            >
              <div className="col-span-1 font-bold">
                {index === 0 && <span className="text-yellow-500">🏆</span>}
                {index === 1 && <span className="text-gray-300">🥈</span>}
                {index === 2 && <span className="text-amber-700">🥉</span>}
                {index > 2 && <span>{index + 1}</span>}
              </div>

              <div className="col-span-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold">
                  {player.username.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="font-medium text-sm truncate">
                    {player.username}
                  </div>
                </div>
              </div>

              <div className="col-span-2 text-center font-mono font-bold text-sm">
                {player.winRate}%
              </div>

              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="font-mono font-bold text-neon-blue text-sm">{player.xp.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="text-gray-400 border-gray-700">
          View All Rankings
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
