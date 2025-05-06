
import React from 'react';
import { cn } from '@/lib/utils';

type StatusBarProps = {
  label: string;
  value: number;
  maxValue: number;
  color?: 'blue' | 'red' | 'orange' | 'green';
  showText?: boolean;
  className?: string;
  animated?: boolean;
};

const StatusBar: React.FC<StatusBarProps> = ({
  label,
  value,
  maxValue,
  color = 'blue',
  showText = true,
  className,
  animated = true
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  const colorClasses = {
    blue: 'bg-neon-blue',
    red: 'bg-neon-red',
    orange: 'bg-neon-orange',
    green: 'bg-emerald-500'
  };
  
  return (
    <div className={cn('w-full', className)}>
      {showText && (
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-gray-300">{label}</span>
          <span className="font-mono">
            {value}/{maxValue}
          </span>
        </div>
      )}
      
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={cn(
            'h-full rounded-full transition-all',
            colorClasses[color],
            animated && 'transition-all duration-700'
          )}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 5 && percentage < 95 && !showText && (
            <div className="flex justify-center h-full items-center text-xs font-semibold text-black">
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
