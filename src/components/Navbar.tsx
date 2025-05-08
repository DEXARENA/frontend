
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

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
    <header className="sticky top-2 z-50 px-2 mx-2">
      <div className="glass-panel rounded-2xl py-1.5 px-3 flex justify-between items-center max-w-7xl mx-auto border border-white/10 shadow-lg">
        {/* Logo */}
        <Link to="/" className="text-lg md:text-xl font-bold flex items-center">
          <Shield size={18} className="text-neon-blue mr-1.5" />
          <span className="text-glow-blue">DEX</span>
          <span className="text-glow-orange">ARENA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/arena" className={`text-xs transition-colors ${location.pathname === '/arena' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Arena
          </Link>
          <Link to="/battle" className={`text-xs transition-colors ${location.pathname === '/battle' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Battle
          </Link>
          <Link to="/leaderboard" className={`text-xs transition-colors ${location.pathname === '/leaderboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Leaderboard
          </Link>
          <Link to="/profile" className={`text-xs transition-colors ${location.pathname === '/profile' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
