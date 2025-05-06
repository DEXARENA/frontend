import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Trophy, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import TokenIcon from './TokenIcon';

import type { TokenType } from './TokenIcon';
export type TokenOption = TokenType;

export type Challenge = {
  id: string;
  type?: string;
  title?: string;
  description?: string;
  stake: {
    amount: string;
    token: TokenOption;
  };
  creator: {
    address: string;
    avatar?: string;
  };
  participants?: {
    address: string;
    avatar?: string;
  }[];
  maxParticipants?: number;
  expiresAt?: Date;
  expiresIn?: number; // seconds
  createdAt: string | Date;
  status?: 'open' | 'active' | 'completed' | 'expired';
  tag?: string;
};

export interface ChallengeProps {
  challenge: Challenge;
  onJoin?: (id: string) => void;
  className?: string;
}

const ChallengeCardCompact: React.FC<ChallengeProps> = ({
  challenge,
  onJoin,
  className
}) => {
  const {
    id,
    title = challenge.type || 'Challenge',
    description,
    stake,
    creator,
    participants = [],
    maxParticipants = 2,
    expiresAt,
    expiresIn,
    createdAt,
    status = 'open',
    tag = challenge.type
  } = challenge;

  // Calculate time left in minutes and seconds
  const now = new Date();
  let timeLeftMillis = 0;

  if (expiresAt) {
    timeLeftMillis = new Date(expiresAt).getTime() - now.getTime();
  } else if (expiresIn) {
    timeLeftMillis = expiresIn * 1000;
  }

  const minutesLeft = Math.floor(timeLeftMillis / (1000 * 60));
  const secondsLeft = Math.floor((timeLeftMillis % (1000 * 60)) / 1000);
  const formattedTimeLeft = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;

  const handleClick = () => {
    if (onJoin && id) {
      onJoin(id);
    }
  };

  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'open': return 'bg-neon-blue/20 text-neon-blue';
      case 'active': return 'bg-neon-orange/20 text-neon-orange';
      case 'completed': return 'bg-green-500/20 text-green-500';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  // Get border color
  const getBorderColor = () => {
    switch (status) {
      case 'open': return 'border-neon-blue/30';
      case 'active': return 'border-neon-orange/30';
      case 'completed': return 'border-green-500/30';
      default: return 'border-gray-600/30';
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "glass-panel relative w-full p-2 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] text-left",
        getBorderColor(),
        className
      )}
      onClick={handleClick}
      aria-label={`Join ${title} challenge`}
    >
      {/* Top row: Type tag and status */}
      <div className="flex justify-between items-center mb-1.5">
        {/* Type tag */}
        <div className="flex items-center gap-1">
          <div className={cn(
            "h-5 w-5 flex items-center justify-center rounded-full",
            tag === 'Ranked' ? "bg-neon-red/20" :
            tag === 'Casual' ? "bg-neon-blue/20" :
            "bg-neon-orange/20"
          )}>
            {tag === 'Ranked' ? (
              <Trophy size={12} className="text-neon-red" />
            ) : tag === 'Casual' ? (
              <Shield size={12} className="text-neon-blue" />
            ) : (
              <Trophy size={12} className="text-neon-orange" />
            )}
          </div>
          <span className="text-xs font-medium">{tag}</span>
        </div>

        {/* Status badge */}
        <Badge
          variant="outline"
          className={cn("text-[10px] px-1.5 py-0 rounded-full", getStatusColor())}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {/* Middle row: Token, amount and time */}
      <div className="flex justify-between items-center mb-1.5">
        {/* Token and amount */}
        <div className="flex items-center gap-1.5">
          <TokenIcon token={stake.token} size="sm" />
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-sm">{stake.amount}</span>
            <span className="text-xs text-gray-400">{stake.token}</span>
          </div>
        </div>

        {/* Time remaining */}
        {(status === 'open' || status === 'active') && (
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={12} />
            <span>{formattedTimeLeft}</span>
          </div>
        )}
      </div>

      {/* Bottom row: Reward and action button */}
      <div className="flex items-center justify-between">
        {/* Reward */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-neon-orange/10">
            <Zap size={12} className="text-neon-orange" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-400">Reward:</span>
            <span className="font-medium text-xs">{(Number(stake.amount) * maxParticipants).toFixed(1)}</span>
            <span className="text-xs text-gray-400">{stake.token}</span>
          </div>
        </div>

        {/* Action button */}
        <Button
          size="sm"
          variant={status === 'open' ? "default" : "outline"}
          disabled={status !== 'open'}
          onClick={handleClick}
          className={cn(
            "text-xs h-7 px-2.5 rounded-md",
            status === 'open' ? "bg-neon-blue hover:bg-neon-blue/80" : "text-gray-400 border-gray-600"
          )}
        >
          {status === 'open'
            ? 'Join'
            : status === 'active'
              ? 'Active'
              : status === 'completed'
                ? 'Done'
                : 'Expired'
          }
        </Button>
      </div>

      {/* Creator address in tooltip */}
      <div className="absolute bottom-0 right-0 opacity-0">
        {creator.address}
      </div>
    </button>
  );
};

export default ChallengeCardCompact;
