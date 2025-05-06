
import React from 'react';
import { cn } from '@/lib/utils';

export type ActionType = 'onchain' | 'offchain';

export type Action = {
  id: string;
  type: ActionType;
  message: string;
  timestamp: string;
  player?: string;
};

type ActionLogProps = {
  actions: Action[];
  className?: string;
  maxHeight?: string;
};

const ActionLog: React.FC<ActionLogProps> = ({
  actions,
  className,
  maxHeight = '300px'
}) => {
  const actionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (actionRef.current) {
      actionRef.current.scrollTop = actionRef.current.scrollHeight;
    }
  }, [actions]);

  return (
    <div className={cn('rounded-lg glass-panel', className)}>
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
        <h3 className="font-bold text-sm">ACTION LOG</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-neon-blue"></span>
            <span className="text-gray-300">Offchain</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-neon-orange"></span>
            <span className="text-gray-300">Onchain</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={actionRef}
        className="overflow-y-auto scrollbar-none p-3 space-y-2"
        style={{ maxHeight }}
      >
        {actions.map((action) => (
          <div 
            key={action.id} 
            className={cn(
              'px-3 py-2 rounded text-sm transition-opacity animate-[fade-in_0.3s_ease-out]',
              action.type === 'onchain' ? 'bg-neon-orange/10 border-l-2 border-neon-orange' : 'bg-neon-blue/10 border-l-2 border-neon-blue'
            )}
          >
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                {action.player && `${action.player.slice(0, 4)}...${action.player.slice(-4)}`}
              </span>
              <span className="text-xs text-gray-400">{action.timestamp}</span>
            </div>
            <p>{action.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionLog;
