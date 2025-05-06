import type { FC } from 'react';
import { Bitcoin, Hexagon, DollarSign, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TokenType = 'ETH' | 'BTC' | 'SOL' | 'MATIC' | 'AVAX' | 'DOGE' | 'USDC';

interface TokenIconProps {
  token: TokenType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const TokenIcon: FC<TokenIconProps> = ({ token, size = 'sm', className }) => {
  // Size mapping
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24
  };

  // Color mapping
  const colorMap: Record<TokenType, string> = {
    ETH: 'text-blue-400',
    BTC: 'text-orange-400',
    SOL: 'text-purple-400',
    MATIC: 'text-purple-500',
    AVAX: 'text-red-400',
    DOGE: 'text-yellow-400',
    USDC: 'text-green-400'
  };

  // Icon mapping
  const renderIcon = () => {
    const iconSize = sizeMap[size];
    const color = colorMap[token];

    switch (token) {
      case 'ETH':
        return <Hexagon size={iconSize} className={color} />; // Using Hexagon for ETH
      case 'BTC':
        return <Bitcoin size={iconSize} className={color} />;
      case 'SOL':
        return <Hexagon size={iconSize} className={color} />;
      case 'MATIC':
        return <Hexagon size={iconSize} className={color} />;
      case 'AVAX':
        return <Hexagon size={iconSize} className={color} />; // Using Hexagon instead of Waves
      case 'DOGE':
        return <DollarSign size={iconSize} className={color} />;
      case 'USDC':
        return <CircleDollarSign size={iconSize} className={color} />; // Using CircleDollarSign for USDC
      default:
        return <DollarSign size={iconSize} className="text-gray-400" />;
    }
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {renderIcon()}
    </div>
  );
};

export default TokenIcon;
