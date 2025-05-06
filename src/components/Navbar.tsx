
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Shield, Bell, Wallet } from 'lucide-react';
import Avatar from './Avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  // Mock user data
  const user = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    avatar: '/placeholder.svg',
    balance: '2.5 ETH'
  };
  
  const handleConnectWallet = () => {
    toast({
      title: "Connect Wallet",
      description: "This would open a wallet connection modal in production.",
      variant: "default",
    });
  };

  if (isLandingPage) {
    return (
      <header className="absolute top-0 left-0 right-0 z-50 py-3 px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <Shield size={24} className="text-neon-blue mr-2" />
              <span className="text-glow-blue">DEX</span>
              <span className="text-glow-orange">ARENA</span>
            </Link>
          </div>
          
          {/* <nav className="hidden md:flex items-center gap-5">
            <Link to="/arena" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Trophy size={16} />
              <span>Arena</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Users size={16} />
              <span>Leaderboard</span>
            </Link>
          </nav> */}
          
          {/* <Button 
            onClick={handleConnectWallet}
            className="bg-neon-blue hover:bg-neon-blue/80 rounded-full text-sm px-4 py-1 h-auto"
          >
            <Wallet size={14} className="mr-1.5" />
            Connect Wallet
          </Button> */}
        </div>
      </header>
    );
  }

  return (
    <header className="glass-panel sticky top-0 z-50 py-2 px-4 rounded-b-2xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl md:text-2xl font-bold flex items-center">
            <Shield size={20} className="text-neon-blue mr-2" />
            <span className="text-glow-blue">DEX</span>
            <span className="text-glow-orange">ARENA</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/arena" className={`flex items-center gap-1 transition-colors ${location.pathname === '/arena' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
            <Trophy size={16} />
            <span>Arena</span>
          </Link>
          <Link to="/battle" className={`flex items-center gap-1 transition-colors ${location.pathname === '/battle' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
            <Shield size={16} />
            <span>Battle</span>
          </Link>
          <Link to="/leaderboard" className={`flex items-center gap-1 transition-colors ${location.pathname === '/leaderboard' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
            <Users size={16} />
            <span>Leaderboard</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <div className="text-xs text-gray-400">Balance</div>
            <div className="font-mono font-bold text-glow-blue">{user.balance}</div>
          </div>
          
          <Button variant="ghost" size="icon" className="relative text-gray-300 w-8 h-8 p-0">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-neon-red"></span>
          </Button>
          
          <Avatar 
            image={user.avatar} 
            address={user.address}
            glowColor="blue"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
