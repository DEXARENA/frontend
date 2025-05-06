
import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

type AvatarProps = {
  image?: string;
  address?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glowColor?: 'blue' | 'red' | 'orange' | 'none';
};

const Avatar: React.FC<AvatarProps> = ({ 
  image, 
  address, 
  size = 'md', 
  className,
  glowColor = 'none'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const glowClasses = {
    blue: 'border-neon-blue shadow-neon',
    red: 'border-neon-red shadow-neon-red',
    orange: 'border-neon-orange shadow-neon-orange',
    none: 'border-gray-700',
  };

  const shortenedAddress = address ? 
    `${address.slice(0, 4)}...${address.slice(-4)}` : 
    'Anon';

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          'rounded-full overflow-hidden border-2 relative flex items-center justify-center bg-gray-900',
          sizeClasses[size],
          glowClasses[glowColor],
          className
        )}
      >
        {image ? (
          <img 
            src={image} 
            alt={address || 'avatar'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-gray-400" size={size === 'xl' ? 48 : size === 'lg' ? 32 : size === 'md' ? 24 : 16} />
        )}
      </div>
      {address && (
        <span className="text-xs text-gray-400 mt-1">{shortenedAddress}</span>
      )}
    </div>
  );
};

export default Avatar;
