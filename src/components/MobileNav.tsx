
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Shield, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const MobileNav: React.FC = () => {
  const location = useLocation();
  
  const handleConnectWallet = () => {
    toast({
      title: "Connect Wallet",
      description: "This would open a wallet connection modal in production.",
      variant: "default",
    });
  };

  const navItems = [
    {
      icon: <Trophy size={20} />,
      label: 'Arena',
      path: '/arena'
    },
    {
      icon: <Shield size={20} />,
      label: 'Battle',
      path: '/battle'
    },
    {
      icon: <Wallet size={20} />,
      label: 'Wallet',
      path: '#',
      onClick: handleConnectWallet
    },
    {
      icon: <Users size={20} />,
      label: 'Leaderboard',
      path: '/leaderboard'
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/profile'
    }
  ];
  
  // Don't show mobile navigation on landing page
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-panel rounded-t-2xl border-t border-white/10 py-2">
        <div className="flex justify-around">
          {navItems.map((item, index) => (
            item.onClick ? (
              <button
                key={index}
                className="flex flex-col items-center py-1 px-2 text-center w-full text-gray-400 hover:text-white transition-colors"
                onClick={item.onClick}
              >
                <div className={cn(
                  "p-1.5 rounded-full",
                  location.pathname === item.path ? "bg-neon-blue/20 text-neon-blue" : "text-gray-400"
                )}>
                  {item.icon}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="flex flex-col items-center py-1 px-2 text-center w-full text-gray-400 hover:text-white transition-colors"
              >
                <div className={cn(
                  "p-1.5 rounded-full",
                  location.pathname === item.path ? "bg-neon-blue/20 text-neon-blue" : "text-gray-400"
                )}>
                  {item.icon}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
