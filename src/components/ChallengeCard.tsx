
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Users, Trophy, CircleDollarSign, ShieldAlert, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

export type TokenOption = 'ETH' | 'BTC' | 'SOL' | 'MATIC' | 'AVAX' | 'DOGE';

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

const ChallengeCard: React.FC<ChallengeProps> = ({
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
    // If we have a Date object
    timeLeftMillis = new Date(expiresAt).getTime() - now.getTime();
  } else if (expiresIn) {
    // If we have seconds remaining
    timeLeftMillis = expiresIn * 1000;
  }

  const minutesLeft = Math.floor(timeLeftMillis / (1000 * 60));
  const secondsLeft = Math.floor((timeLeftMillis % (1000 * 60)) / 1000);

  // Format the time left as mm:ss
  const formattedTimeLeft = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;

  // Determine the time left label based on status
  const getTimeLabel = () => {
    if (status === 'open') return "Entry closes in";
    if (status === 'active') return "Battle ends in";
    if (status === 'completed') return "Completed";
    return "Expired";
  };

  const handleClick = () => {
    if (onJoin && id) {
      onJoin(id);
    }
  };

  return (
    <div
      className={cn(
        `glass-panel relative w-full p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01]`,
        status === 'open' ? 'border-neon-blue/30' :
        status === 'active' ? 'border-neon-orange/30' :
        status === 'completed' ? 'border-neon-green/30' : 'border-gray-600/30',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-400 mb-2">{description}</p>}
        </div>

        <div className="flex flex-col items-end">
          <div className={cn(
            "px-2 py-1 rounded text-xs",
            status === 'open' ? 'bg-neon-blue/20 text-neon-blue' :
            status === 'active' ? 'bg-neon-orange/20 text-neon-orange' :
            status === 'completed' ? 'bg-green-500/20 text-green-500' :
            'bg-gray-600/20 text-gray-400'
          )}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>

          {status === 'open' || status === 'active' ? (
            <div className="flex items-center mt-2 gap-1">
              <Clock size={14} className="text-gray-400" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">{getTimeLabel()}</span>
                <span className="text-sm font-mono">{formattedTimeLeft}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 mt-2">
              {formatDistanceToNow(typeof createdAt === 'string' ? new Date(createdAt) : createdAt, { addSuffix: true })}
            </div>
          )}
        </div>
      </div>

      {tag && (
        <div className="absolute top-4 left-0 -translate-x-1 px-2 py-0.5 bg-neon-orange/90 text-white text-xs rounded-r-full">
          {tag}
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Shield size={14} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Created by</span>
          <div className="flex items-center">
            {creator && <Avatar
              image={creator.avatar}
              address={creator.address}
              size="xs"
            />}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <CircleDollarSign size={16} className="text-neon-blue" />
          <div>
            <div className="text-xs text-gray-400">Stake</div>
            <div className="font-bold">{stake.amount} {stake.token}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Trophy size={16} className="text-neon-orange" />
          <div>
            <div className="text-xs text-gray-400">Reward</div>
            <div className="font-bold">{(Number(stake.amount) * maxParticipants).toFixed(1)} {stake.token}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Users size={16} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Players</div>
            <div className="font-bold">{participants.length}/{maxParticipants}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="relative -ml-2 first:ml-0"
              style={{ zIndex: 10 - index }}
            >
              <Avatar
                image={participant.avatar}
                address={participant.address}
                size="sm"
                className="border-2 border-background"
              />
            </div>
          ))}

          {participants.length < maxParticipants && (
            <div
              className={cn(
                "relative -ml-2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border-2 border-background",
                { "animate-pulse": status === 'open' }
              )}
              style={{ zIndex: 10 - participants.length }}
            >
              <span className="text-xs text-gray-400">+</span>
            </div>
          )}
        </div>

        <Button
          size="sm"
          variant={status === 'open' ? "default" : "outline"}
          disabled={status !== 'open'}
          onClick={handleClick}
          className={cn(
            status === 'open' ? "bg-neon-blue hover:bg-neon-blue/80" : "text-gray-400 border-gray-600"
          )}
        >
          {status === 'open'
            ? 'Join Battle'
            : status === 'active'
              ? 'In Progress'
              : status === 'completed'
                ? 'Completed'
                : 'Expired'
          }
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;
