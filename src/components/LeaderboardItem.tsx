
import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';

type LeaderboardItemProps = {
  rank: number;
  player: {
    address: string;
    avatar?: string;
    isAnonymous?: boolean;
  };
  wins: number;
  earnings: string;
  className?: string;
};

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  player,
  wins,
  earnings,
  className
}) => {
  const isTopThree = rank <= 3;
  
  const rankColors = {
    1: 'text-yellow-400 border-yellow-400',
    2: 'text-gray-300 border-gray-300',
    3: 'text-amber-600 border-amber-600',
  };
  
  return (
    <div 
      className={cn(
        'flex items-center gap-3 p-3 glass-panel rounded-lg transition-transform hover:scale-[1.01]',
        isTopThree ? 'border-l-2' : '',
        isTopThree ? rankColors[rank as 1 | 2 | 3] : '',
        className
      )}
    >
      <div className={cn(
        'w-8 h-8 flex items-center justify-center rounded-full font-bold',
        isTopThree ? 'bg-gray-800' : 'text-gray-400'
      )}>
        {rank}
      </div>
      
      <Avatar 
        image={player.avatar} 
        address={player.isAnonymous ? undefined : player.address}
        glowColor={isTopThree ? (rank === 1 ? 'orange' : (rank === 2 ? 'blue' : 'red')) : 'none'}
      />
      
      <div className="flex-1">
        {player.isAnonymous ? (
          <div className="font-medium">Anonymous User</div>
        ) : (
          <div className="font-medium">{player.address.slice(0, 6)}...{player.address.slice(-4)}</div>
        )}
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-400">Wins</div>
        <div className="font-bold">{wins}</div>
      </div>
      
      <div className="text-right">
        <div className="text-sm text-gray-400">Earnings</div>
        <div className="font-bold text-glow-blue">{earnings}</div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
