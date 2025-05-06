
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';
import CountdownTimer from './CountdownTimer';
import StatusBar from './StatusBar';
import ActionLog, { Action } from './ActionLog';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

type Player = {
  address: string;
  avatar?: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  token?: string;
};

type BattleProps = {
  player1: Player;
  player2: Player;
  stake: {
    amount: string;
    token: string;
  };
  timeRemaining: number;
  actions: Action[];
  onAction: (action: string) => void;
  onForfeit: () => void;
  className?: string;
};

const Battle: React.FC<BattleProps> = ({
  player1,
  player2,
  stake,
  timeRemaining,
  actions,
  onAction,
  onForfeit,
  className
}) => {
  const [battleState, setBattleState] = useState<'preparing' | 'active' | 'finishing'>('preparing');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Simulate battle preparation with countdown
    if (battleState === 'preparing') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setBattleState('active');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [battleState]);

  return (
    <div className={cn('w-full max-w-6xl mx-auto', className)}>
      {battleState === 'preparing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-glow-orange mb-4">BATTLE STARTS IN</h2>
            <div className="text-8xl font-bold text-glow-blue animate-pulse">{countdown}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <div className="lg:col-span-2 glass-panel rounded-lg p-2 sm:p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-neon-orange" />
              <div>
                <h2 className="text-base font-bold">Battle Arena</h2>
                <p className="text-xs text-gray-400">Stake: {stake.amount} {stake.token}</p>
              </div>
            </div>

            <CountdownTimer
              initialSeconds={timeRemaining}
              progressColor="orange"
              className="w-24 sm:w-28"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-4">
            {/* Player 1 */}
            <div className="flex-1 glass-panel rounded-lg p-2 sm:p-3 neon-border-blue">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold">
                  {player1.token?.charAt(0) || 'Y'}
                </div>
                <div>
                  <h3 className="text-sm font-bold">You {player1.token && `(${player1.token})`}</h3>
                  <p className="text-xs text-neon-blue">
                    {player1.address.slice(0, 4)}...{player1.address.slice(-4)}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <StatusBar
                  label="Health"
                  value={player1.health}
                  maxValue={player1.maxHealth}
                  color="blue"
                  size="sm"
                />
              </div>
            </div>

            {/* VS Indicator */}
            <div className="flex items-center justify-center py-1 sm:py-0">
              <div className="text-xl sm:text-2xl font-bold text-glow-orange">VS</div>
            </div>

            {/* Player 2 */}
            <div className="flex-1 glass-panel rounded-lg p-2 sm:p-3 neon-border-red">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-neon-red/20 flex items-center justify-center text-neon-red font-bold">
                  {player2.token?.charAt(0) || 'O'}
                </div>
                <div>
                  <h3 className="text-sm font-bold">Opponent {player2.token && `(${player2.token})`}</h3>
                  <p className="text-xs text-neon-red">
                    {player2.address.slice(0, 4)}...{player2.address.slice(-4)}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <StatusBar
                  label="Health"
                  value={player2.health}
                  maxValue={player2.maxHealth}
                  color="red"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Hidden action buttons as per request */}
          <div className="hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => onAction('attack')}
                className="bg-neon-red hover:bg-neon-red/80 font-bold"
                disabled={battleState !== 'active'}
              >
                Attack
              </Button>
              <Button
                onClick={() => onAction('defend')}
                className="bg-neon-blue hover:bg-neon-blue/80 font-bold"
                disabled={battleState !== 'active'}
              >
                Defend
              </Button>
              <Button
                onClick={() => onAction('special')}
                className="bg-neon-orange hover:bg-neon-orange/80 font-bold"
                disabled={battleState !== 'active' || player1.energy < 3}
              >
                Special
              </Button>
              <Button
                onClick={onForfeit}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 font-bold"
              >
                Forfeit
              </Button>
            </div>
          </div>

          {/* Single forfeit button */}
          <div className="flex justify-end">
            <Button
              onClick={onForfeit}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs h-7"
            >
              Forfeit Battle
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ActionLog actions={actions} maxHeight="300px" />
        </div>
      </div>
    </div>
  );
};

export default Battle;
