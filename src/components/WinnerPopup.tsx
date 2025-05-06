import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';
import { PlayerData } from '@/components/PriceLineChart';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

interface WinnerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  winner: PlayerData | null;
  loser: PlayerData | null;
  winnerPnl: number;
  loserPnl: number;
  reward?: string;
  duration?: number; // Battle duration in seconds
}

const WinnerPopup: React.FC<WinnerPopupProps> = ({
  isOpen,
  onClose,
  winner,
  loser,
  winnerPnl,
  loserPnl,
  reward = '0.05 ETH',
  duration = 60
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [claimingReward, setClaimingReward] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const { width, height } = useWindowSize();

  // Show confetti when popup opens
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setClaimingReward(false);
      setRewardClaimed(false);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Show confetti for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle claim reward
  const handleClaimReward = () => {
    setClaimingReward(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setClaimingReward(false);
      setRewardClaimed(true);

      // Show new confetti burst on successful claim
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 2000);
  };

  if (!winner || !loser) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Confetti effect */}
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.15}
            />
          )}

          {/* Popup content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="glass-panel border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full pointer-events-auto relative overflow-hidden">
              {/* Background glow effects */}
              <div className="absolute -z-10 top-0 left-1/4 w-1/2 h-1/2 bg-neon-blue/20 rounded-full filter blur-3xl" />
              <div className="absolute -z-10 bottom-0 right-1/4 w-1/2 h-1/2 bg-neon-red/20 rounded-full filter blur-3xl" />

              {/* Winner badge */}
              <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-bold px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                  WINNER
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Battle Results</h2>

              {/* Battle stats */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Duration and reward */}
                <div className="flex justify-between items-center">
                  <div className="text-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="font-medium text-sm sm:text-base">{duration} seconds</div>
                  </div>

                  <div className="text-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400">Reward</div>
                    <div className="font-medium text-neon-green text-sm sm:text-base">{reward}</div>
                  </div>
                </div>

                {/* Players comparison */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {/* Winner */}
                  <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl bg-gradient-to-b from-green-500/20 to-transparent border border-green-500/30">
                    <Avatar
                      image={winner.avatar}
                      address={winner.address}
                      size="md"
                      glowColor="green"
                    />
                    <div className="mt-2 sm:mt-3 text-center">
                      <div className="font-bold text-sm sm:text-base">{winner.name}</div>
                      <div className="text-neon-green font-mono text-sm sm:text-lg font-bold mt-0.5 sm:mt-1">
                        ${winner.value.toFixed(2)}
                      </div>
                      <div className="text-green-400 font-mono text-xs sm:text-sm mt-0.5 sm:mt-1">
                        +{winnerPnl.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Loser */}
                  <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl bg-gradient-to-b from-red-500/20 to-transparent border border-red-500/30">
                    <Avatar
                      image={loser.avatar}
                      address={loser.address}
                      size="md"
                      glowColor="red"
                    />
                    <div className="mt-2 sm:mt-3 text-center">
                      <div className="font-bold text-sm sm:text-base">{loser.name}</div>
                      <div className="text-neon-red font-mono text-sm sm:text-lg font-bold mt-0.5 sm:mt-1">
                        ${loser.value.toFixed(2)}
                      </div>
                      <div className="text-red-400 font-mono text-xs sm:text-sm mt-0.5 sm:mt-1">
                        {loserPnl.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Victory message */}
                <div className="text-center bg-gray-800/50 p-2 sm:p-4 rounded-lg">
                  <p className="text-sm sm:text-lg">
                    <span className="font-bold text-neon-green">{winner.id.toUpperCase()}</span> outperformed <span className="font-bold text-neon-red">{loser.id.toUpperCase()}</span> with a price change of <span className="font-bold text-neon-green">+{winnerPnl.toFixed(2)}%</span> vs <span className="font-bold text-neon-red">{loserPnl.toFixed(2)}%</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2 sm:gap-4 mt-2">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="text-sm h-9"
                    disabled={claimingReward}
                  >
                    Close
                  </Button>

                  {!rewardClaimed ? (
                    <Button
                      className={`relative overflow-hidden text-sm h-9 ${
                        claimingReward
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-neon-blue to-neon-green hover:from-neon-blue/90 hover:to-neon-green/90'
                      }`}
                      onClick={handleClaimReward}
                      disabled={claimingReward}
                    >
                      {claimingReward && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-green/20"
                          animate={{
                            x: ["0%", "100%"],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear"
                          }}
                        />
                      )}
                      {claimingReward ? 'Processing...' : 'Claim Reward'}
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-500 hover:bg-green-500/90 text-sm h-9"
                      disabled
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                      >
                        ✓ Claimed
                      </motion.span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WinnerPopup;
