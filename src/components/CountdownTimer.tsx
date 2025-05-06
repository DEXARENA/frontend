
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Timer } from 'lucide-react';

type CountdownTimerProps = {
  initialSeconds: number;
  onComplete?: () => void;
  compact?: boolean;
  className?: string;
  showProgress?: boolean;
  progressColor?: 'blue' | 'red' | 'orange';
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onComplete,
  compact = false,
  className,
  showProgress = true,
  progressColor = 'blue'
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onComplete]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressColorClasses = {
    blue: 'bg-neon-blue',
    red: 'bg-neon-red',
    orange: 'bg-neon-orange'
  };

  // Calculate progress percentage
  const progressPercent = (seconds / initialSeconds) * 100;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {!compact && <Timer size={18} className={`text-neon-${progressColor}`} />}
      <div className="relative flex flex-col w-full">
        <span className={cn(
          "font-mono font-bold",
          compact ? "text-sm" : "text-base"
        )}>
          {formatTime(seconds)}
        </span>
        
        {showProgress && (
          <div className="w-full bg-gray-800 h-1 mt-1 rounded overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-1000", 
                progressColorClasses[progressColor]
              )} 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
