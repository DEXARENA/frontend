
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Check, Medal, Trophy, Shield, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const steps = [
    {
      icon: <Shield size={48} className="text-neon-blue mb-4" />,
      title: "Welcome to DEXARENA",
      description: "The ultimate PvP prediction platform where skill meets zero-knowledge privacy.",
      buttonText: "Get Started"
    },
    {
      icon: <Trophy size={48} className="text-neon-orange mb-4" />,
      title: "Create or Join Duels",
      description: "Challenge other traders in prediction battles with your favorite tokens.",
      buttonText: "Continue"
    },
    {
      icon: <Medal size={48} className="text-neon-red mb-4" />,
      title: "Win Rewards",
      description: "Climb the leaderboards and earn rewards with your prediction skills.",
      buttonText: "Continue"
    },
    {
      icon: <Wallet size={48} className="text-neon-blue mb-4" />,
      title: "Connect Your Wallet",
      description: "To start dueling, connect your wallet and get access to all features.",
      buttonText: "Connect Wallet"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Handle wallet connection in the last step
      if (step === steps.length - 1) {
        setIsConnecting(true);
        
        // Simulate wallet connection
        setTimeout(() => {
          setIsConnecting(false);
          toast({
            title: "Wallet Connected Successfully!",
            description: "You're now ready to start dueling.",
            variant: "default",
          });
          onComplete();
        }, 1500);
      }
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="glass-panel max-w-md w-full p-6 rounded-2xl border-t border-white/10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleSkip}
            className="text-gray-400 hover:text-white text-sm"
          >
            Skip
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2">
            {[...Array(steps.length)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full mx-1 ${
                  i === step ? 'bg-neon-blue' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            {steps[step].icon}
            <h2 className="text-2xl font-bold mb-2">{steps[step].title}</h2>
            <p className="text-gray-300 mb-6">{steps[step].description}</p>
          </motion.div>

          <Button 
            onClick={handleNext}
            className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white font-medium py-2 px-4 rounded-full"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="flex items-center">
                Connecting <span className="ml-2 animate-pulse">...</span>
              </span>
            ) : (
              steps[step].buttonText
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;
