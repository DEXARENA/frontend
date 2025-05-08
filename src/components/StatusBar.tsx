
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
  size?: 'default' | 'sm';
};

const StatusBar: React.FC<StatusBarProps> = ({
  label,
  value,
  maxValue,
  color = 'blue',
  showText = true,
  className,
  animated = true,
  size = 'default'
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
        <div className={cn(
          "flex justify-between mb-1",
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        )}>
          <span className="font-medium text-gray-300">{label}</span>
          <span className="font-mono">
            {value}/{maxValue}
          </span>
        </div>
      )}

      <div className={cn(
        "bg-gray-800 rounded-full overflow-hidden",
        size === 'sm' ? 'h-2' : 'h-3'
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all',
            colorClasses[color],
            animated && 'transition-all duration-700'
          )}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 5 && percentage < 95 && !showText && (
            <div className={cn(
              "flex justify-center h-full items-center font-semibold text-black",
              size === 'sm' ? 'text-[8px]' : 'text-xs'
            )}>
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
