
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Battle from '@/components/Battle';
import { mockActions } from '@/data/mockData';
import { Action } from '@/components/ActionLog';
import { toast } from '@/hooks/use-toast';
import PriceLineChart, { PlayerData } from '@/components/PriceLineChart';
import WinnerPopup from '@/components/WinnerPopup';
import Avatar from '@/components/Avatar';

const BattlePage = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState<Action[]>(mockActions);

  // Battle timer state
  const [battleDuration] = useState(60); // 60 seconds battle duration
  const [timeRemaining, setTimeRemaining] = useState(battleDuration);
  const [battleActive, setBattleActive] = useState(true);

  // Winner popup state
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [battleWinner, setBattleWinner] = useState<PlayerData | null>(null);
  const [battleLoser, setBattleLoser] = useState<PlayerData | null>(null);
  const [player1Data, setPlayer1Data] = useState<PlayerData>({
    id: 'eth',
    name: 'ETH (You)',
    value: 3245.78,
    color: '#a3e635', // Lime green color to match image
    avatar: '/placeholder.svg',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    pnl: -0.08, // Initial profit/loss percentage (negative to match image)
    prevValue: 3248.38 // Previous value for calculating change
  });
  const [player2Data, setPlayer2Data] = useState<PlayerData>({
    id: 'btc',
    name: 'BTC (Opponent)',
    value: 52136.42,
    color: '#ec4899', // Pink color to match image
    avatar: '/placeholder.svg',
    address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    pnl: -0.05, // Initial profit/loss percentage (negative to match image)
    prevValue: 52162.64 // Previous value for calculating change
  });

  // Health and energy data for battle component
  const player1Health = {
    health: 75,
    maxHealth: 100,
    energy: 5,
    maxEnergy: 10,
    token: 'ETH'
  };

  const player2Health = {
    health: 85,
    maxHealth: 100,
    energy: 7,
    maxEnergy: 10,
    token: 'BTC'
  };

  // Battle timer countdown
  useEffect(() => {
    if (!battleActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Battle is over
          clearInterval(timer);
          setBattleActive(false);

          // Determine winner based on price performance
          const player1Performance = player1Data.pnl || 0;
          const player2Performance = player2Data.pnl || 0;

          if (player1Performance > player2Performance) {
            setBattleWinner(player1Data);
            setBattleLoser(player2Data);
          } else {
            setBattleWinner(player2Data);
            setBattleLoser(player1Data);
          }

          // Show winner popup after a short delay
          setTimeout(() => {
            setShowWinnerPopup(true);
          }, 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [battleActive, player1Data, player2Data]);

  // Generate realistic price movements every 5 seconds
  // This simulates what would happen with real Chainlink/Pyth data
  useEffect(() => {
    // Market simulation parameters
    const marketParams = {
      // Base values for the tokens
      baseETHValue: 3245.78,
      baseBTCValue: 52136.42,

      // Volatility settings (how much the price can change)
      // Higher volatility for more visible price movements
      ethVolatility: 0.04, // 4% max change
      btcVolatility: 0.035, // 3.5% max change

      // Market trend simulation (simulates market conditions)
      ethTrend: 0.3,  // Stronger upward trend for ETH
      btcTrend: -0.2, // Stronger downward trend for BTC

      // Correlation between assets (simulates market correlation)
      correlation: 0.3, // 30% correlation between ETH and BTC

      // Randomness factor (how much random noise to add)
      randomness: 0.7
    };

    // Function to simulate price movement with market conditions
    // This simulates what would happen with real oracle data
    const simulateMarketPrice = (
      prevPrice: number,
      volatility: number,
      trend: number,
      otherAssetChange = 0,
      correlation = 0
    ) => {
      // Random component (Brownian motion)
      const randomComponent = (Math.random() * 2 - 1) * volatility;

      // Trend component (simulates market direction)
      const trendComponent = trend * volatility / 2;

      // Correlation component (simulates how assets move together)
      const correlationComponent = otherAssetChange * correlation;

      // Combine components with weights
      const totalChange = (
        (randomComponent * marketParams.randomness) +
        trendComponent +
        correlationComponent
      );

      // Calculate new price
      return prevPrice * (1 + totalChange);
    };

    // Update prices every 5 seconds
    const interval = setInterval(() => {
      // First update ETH price
      setPlayer1Data(prev => {
        // Calculate new value
        const prevValue = prev.value;
        const newValue = simulateMarketPrice(
          prevValue,
          marketParams.ethVolatility,
          marketParams.ethTrend
        );

        // Calculate percentage change
        const pnlPercentage = ((newValue - prevValue) / prevValue) * 100;

        return {
          ...prev,
          value: newValue,
          prevValue: prevValue,
          pnl: pnlPercentage
        };
      });

      // Then update BTC price with correlation to ETH's movement
      setPlayer1Data(p1 => {
        // Get ETH's change to factor in correlation
        const ethChange = (p1.value - p1.prevValue) / p1.prevValue;

        setPlayer2Data(prev => {
          // Calculate new value with correlation to ETH
          const prevValue = prev.value;
          const newValue = simulateMarketPrice(
            prevValue,
            marketParams.btcVolatility,
            marketParams.btcTrend,
            ethChange,
            marketParams.correlation
          );

          // Calculate percentage change
          const pnlPercentage = ((newValue - prevValue) / prevValue) * 100;

          return {
            ...prev,
            value: newValue,
            prevValue: prevValue,
            pnl: pnlPercentage
          };
        });

        return p1; // Return unchanged ETH state
      });

      // Add price update to action log with P&L info
      // Get the latest values from state setters to avoid dependency issues
      setPlayer1Data(p1 => {
        setPlayer2Data(p2 => {
          const priceAction: Action = {
            id: `action-${Date.now()}`,
            type: 'onchain',
            message: `ETH: $${p1.value.toFixed(2)} (${p1.pnl >= 0 ? '+' : ''}${p1.pnl.toFixed(2)}%) | BTC: $${p2.value.toFixed(2)} (${p2.pnl >= 0 ? '+' : ''}${p2.pnl.toFixed(2)}%)`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          };

          setActions(prev => [...prev, priceAction]);
          return p2; // Return unchanged state
        });
        return p1; // Return unchanged state
      });
    }, 5000); // Update every 5 seconds as requested

    return () => clearInterval(interval);
  }, []);



  const stake = {
    amount: '0.5',
    token: 'ETH'
  };

  const handleAction = (action: string) => {
    // Add the player action to the log
    const newAction: Action = {
      id: `action-${Date.now()}`,
      type: 'offchain',
      message: `You used ${action}!`,
      player: player1Data.address,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setActions([...actions, newAction]);

    // Simulate opponent response after a delay
    setTimeout(() => {
      const responseAction: Action = {
        id: `action-${Date.now() + 1}`,
        type: Math.random() > 0.3 ? 'offchain' : 'onchain',
        message: Math.random() > 0.3
          ? `Opponent used ${['attack', 'defend', 'special'][Math.floor(Math.random() * 3)]}!`
          : 'ZK Proof generated for turn verification.',
        player: Math.random() > 0.3 ? player2Data.address : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setActions(prev => [...prev, responseAction]);
    }, 1000);

    toast({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      description: `You used ${action}. Waiting for opponent...`,
      variant: "default",
    });

    // Simulate match end after some actions
    if (actions.length > 15) {
      setTimeout(() => {
        navigate('/result');
      }, 3000);
    }
  };

  const handleForfeit = () => {
    toast({
      title: "Forfeit Battle",
      description: "Are you sure you want to forfeit this battle? You will lose your stake.",
      variant: "destructive",
    });

    // In a real app, we would show a confirmation dialog here
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container px-2 sm:px-4 py-4 md:py-8">
      {/* Animated Price Line Chart */}
      <div className="mb-4 md:mb-6 relative">
        {/* Update info - desktop */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-neon-blue/20 text-neon-blue text-xs px-2 py-0.5 rounded-full z-10 hidden sm:block">
          Updates every 5 seconds
        </div>

        {/* Battle timer */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <div className={`px-2 sm:px-3 py-1 rounded-full font-mono font-bold text-xs sm:text-sm ${
            timeRemaining <= 10
              ? 'bg-red-500/30 text-red-400 animate-pulse'
              : 'bg-gray-800/70 text-gray-300'
          }`}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <PriceLineChart
          player1={player1Data}
          player2={player2Data}
          title="Token Price Battle"
          className="h-[300px] sm:h-[350px] md:h-[400px]"
          updateInterval={5000}
        />
      </div>

      {/* Winner popup */}
      <WinnerPopup
        isOpen={showWinnerPopup}
        onClose={() => setShowWinnerPopup(false)}
        winner={battleWinner}
        loser={battleLoser}
        winnerPnl={battleWinner?.pnl || 0}
        loserPnl={battleLoser?.pnl || 0}
        duration={battleDuration}
      />

      <div className="mt-2 md:mt-4">
        <Battle
          player1={{
            address: player1Data.address,
            avatar: player1Data.avatar,
            health: player1Health.health,
            maxHealth: player1Health.maxHealth,
            energy: player1Health.energy,
            maxEnergy: player1Health.maxEnergy,
            token: player1Health.token
          }}
          player2={{
            address: player2Data.address,
            avatar: player2Data.avatar,
            health: player2Health.health,
            maxHealth: player2Health.maxHealth,
            energy: player2Health.energy,
            maxEnergy: player2Health.maxEnergy,
            token: player2Health.token
          }}
          stake={stake}
          timeRemaining={600} // 10 minutes
          actions={actions}
          onAction={handleAction}
          onForfeit={handleForfeit}
        />
      </div>
    </div>
  );
};

export default BattlePage;
