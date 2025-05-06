import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/Avatar';

export interface PlayerData {
  id: string;
  name: string;
  value: number;
  color: string;
  avatar?: string;
  address: string;
  pnl?: number; // Profit and loss percentage
  prevValue?: number; // Previous value for calculating change
}

interface WavyLineChartProps {
  player1: PlayerData;
  player2: PlayerData;
  title?: string;
  className?: string;
  updateInterval?: number;
}

const WavyLineChart: React.FC<WavyLineChartProps> = ({
  player1,
  player2,
  title = 'Real-time Token Price Battle',
  className = '',
  updateInterval = 5000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(0);

  // Parameters for the price movement waves - just 2 players for PvP
  const [waveParams, setWaveParams] = useState({
    player1: {
      amplitude: 50,
      frequency: 0.008,
      phase: Math.PI / 4,
      speed: 0.001,
      baseY: dimensions.height / 2, // Base Y position for the wave
      priceChange: 0 // Track price change for animation
    },
    player2: {
      amplitude: 50,
      frequency: 0.008,
      phase: Math.PI * 1.25, // Offset from player 1
      speed: 0.001,
      baseY: dimensions.height / 2, // Base Y position for the wave
      priceChange: 0 // Track price change for animation
    }
  });

  // Update dimensions when component mounts or window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animate the waves
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  // Update wave parameters based on price changes
  useEffect(() => {
    // Calculate price changes - simpler calculation to avoid dependency issues
    const player1PrevValue = player1.value - (player1.value * 0.01); // Assume 1% change for animation
    const player2PrevValue = player2.value - (player2.value * 0.01);

    const player1Change = player1.value - player1PrevValue;
    const player2Change = player2.value - player2PrevValue;

    // Calculate new base Y positions based on price changes
    // Move the wave up when price increases, down when it decreases
    const midHeight = dimensions.height / 2;
    const player1BaseY = midHeight - (player1Change * 50); // Scale the movement
    const player2BaseY = midHeight - (player2Change * 50);

    setWaveParams(prev => ({
      player1: {
        ...prev.player1,
        baseY: player1BaseY,
        phase: prev.player1.phase + 0.05, // Keep advancing the phase for wave movement
        priceChange: player1Change
      },
      player2: {
        ...prev.player2,
        baseY: player2BaseY,
        phase: prev.player2.phase + 0.05,
        priceChange: player2Change
      }
    }));
  }, [player1.value, player2.value, dimensions.height]);

  // Animate the waves continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  // Generate points for the sine wave with price movement
  const generateWavePath = (params: typeof waveParams.player1) => {
    if (dimensions.width === 0) return '';

    const { amplitude, frequency, phase, speed, baseY } = params;
    const points = [];
    const steps = 100; // Number of points to generate

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * dimensions.width;
      const t = time * speed;
      // Use baseY instead of fixed dimensions.height/2 to allow for price movement
      const y = (baseY || dimensions.height / 2) +
                amplitude * Math.sin(frequency * x + phase + t);
      points.push(`${x},${y}`);
    }

    return `M${points.join(' L')}`;
  };

  // Calculate end positions for avatars with price movement
  const getEndPosition = (params: typeof waveParams.player1) => {
    if (dimensions.width === 0) return { x: 0, y: 0 };

    const { amplitude, frequency, phase, speed, baseY } = params;
    const x = dimensions.width; // Position at the very end of the chart
    const t = time * speed;
    // Use baseY instead of fixed dimensions.height/2 to allow for price movement
    const y = (baseY || dimensions.height / 2) +
              amplitude * Math.sin(frequency * x + phase + t);

    return { x, y };
  };

  const player1Path = generateWavePath(waveParams.player1);
  const player2Path = generateWavePath(waveParams.player2);
  const player1EndPos = getEndPosition(waveParams.player1);
  const player2EndPos = getEndPosition(waveParams.player2);

  return (
    <div className={`glass-panel p-6 rounded-xl border-t border-white/10 shadow-lg relative overflow-hidden ${className}`}>
      {/* Background glow effects */}
      <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 rounded-full filter blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neon-red/10 rounded-full filter blur-3xl" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Avatar image={player1.avatar} address={player1.address} size="sm" glowColor="blue" />
            <div>
              <span className="text-xs text-gray-400">You ({player1.id.toUpperCase()})</span>
              <div className="text-neon-blue font-mono font-bold">${player1.value.toFixed(2)}</div>
              {player1.pnl !== undefined && (
                <div className={`text-xs font-mono ${player1.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {player1.pnl >= 0 ? '+' : ''}{player1.pnl.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar image={player2.avatar} address={player2.address} size="sm" glowColor="red" />
            <div>
              <span className="text-xs text-gray-400">Opponent ({player2.id.toUpperCase()})</span>
              <div className="text-neon-red font-mono font-bold">${player2.value.toFixed(2)}</div>
              {player2.pnl !== undefined && (
                <div className={`text-xs font-mono ${player2.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {player2.pnl >= 0 ? '+' : ''}{player2.pnl.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[300px]">
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 300}`}
          preserveAspectRatio="none"
          aria-label="Token price battle chart"
          role="img"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1={dimensions.height / 2}
            x2={dimensions.width}
            y2={dimensions.height / 2}
            stroke="#333"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          {/* Player 1 wave */}
          <path
            d={player1Path}
            fill="none"
            stroke={player1.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Player 2 wave */}
          <path
            d={player2Path}
            fill="none"
            stroke={player2.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Player 1 Avatar with price info */}
        <div
          className="absolute"
          style={{
            transform: `translate(${player1EndPos.x - 120}px, ${player1EndPos.y - 16}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar
              image={player1.avatar}
              address={player1.address}
              size="sm"
              glowColor="blue"
            />
            <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-800">
              <div className="text-neon-blue font-mono font-bold text-sm">${player1.value.toFixed(2)}</div>
              {player1.pnl !== undefined && (
                <div className={`text-xs font-mono ${player1.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {player1.pnl >= 0 ? '↑' : '↓'} {Math.abs(player1.pnl).toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Player 2 Avatar with price info */}
        <div
          className="absolute"
          style={{
            transform: `translate(${player2EndPos.x - 120}px, ${player2EndPos.y - 16}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar
              image={player2.avatar}
              address={player2.address}
              size="sm"
              glowColor="red"
            />
            <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-800">
              <div className="text-neon-red font-mono font-bold text-sm">${player2.value.toFixed(2)}</div>
              {player2.pnl !== undefined && (
                <div className={`text-xs font-mono ${player2.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {player2.pnl >= 0 ? '↑' : '↓'} {Math.abs(player2.pnl).toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavyLineChart;
