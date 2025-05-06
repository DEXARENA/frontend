import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold flex items-center mb-6 md:mb-0">
            <Shield size={24} className="text-neon-blue mr-2" />
            <span className="text-glow-blue">DEX</span>
            <span className="text-glow-orange">ARENA</span>
          </div>

          <div className="text-gray-400 text-sm">
            © 2025 DEXARENA. All rights reserved.
          </div>

          <div className="flex gap-6 mt-6 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Privacy</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Discord</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
