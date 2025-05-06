import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Store price history for each player
interface PricePoint {
  value: number;      // Percentage change value
  timestamp: number;  // Timestamp for the data point
  rawPrice?: number;  // Actual price value (will come from Chainlink/Pyth in the future)
  trend?: 'up' | 'down' | 'neutral'; // Price trend indicator
}

interface PriceLineChartProps {
  player1: PlayerData;
  player2: PlayerData;
  title?: string;
  className?: string;
  updateInterval?: number;
  compact?: boolean;
}

const PriceLineChart: React.FC<PriceLineChartProps> = ({
  player1,
  player2,
  title = 'Real-time Token Price Battle',
  className = '',
  updateInterval = 5000,
  compact = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Store price history for each player
  const [player1History, setPlayer1History] = useState<PricePoint[]>([]);
  const [player2History, setPlayer2History] = useState<PricePoint[]>([]);

  // Animation state for smooth transitions
  const [animating, setAnimating] = useState(false);

  // Max number of points to show in the chart
  const maxHistoryPoints = 20;

  // Interpolation points for smooth animation
  const interpolationSteps = 30; // Number of steps for smooth animation

  // Y-axis scale values - dynamic to better show price movements
  const [yAxisScale, setYAxisScale] = useState({
    min: -0.15, // -15%
    max: 0.15,  // +15%
    mid: 0      // 0%
  });

  // Track the highest and lowest values to adjust scale
  const [priceExtremes, setPriceExtremes] = useState({
    min: -0.15,
    max: 0.15
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

  // Initialize price history with starting values
  useEffect(() => {
    const now = Date.now();
    const initialHistory1: PricePoint[] = [];
    const initialHistory2: PricePoint[] = [];

    // Create initial history with slight variations to simulate existing data
    // This will make the chart look more realistic from the start
    for (let i = maxHistoryPoints; i > 0; i--) {
      // Small random variations for initial data
      const randomValue1 = (Math.random() * 0.02) - 0.01; // -1% to +1%
      const randomValue2 = (Math.random() * 0.02) - 0.01; // -1% to +1%

      initialHistory1.push({
        value: randomValue1,
        timestamp: now - (i * updateInterval),
        rawPrice: player1.value * (1 + randomValue1),
        trend: randomValue1 > 0 ? 'up' : randomValue1 < 0 ? 'down' : 'neutral'
      });

      initialHistory2.push({
        value: randomValue2,
        timestamp: now - (i * updateInterval),
        rawPrice: player2.value * (1 + randomValue2),
        trend: randomValue2 > 0 ? 'up' : randomValue2 < 0 ? 'down' : 'neutral'
      });
    }

    setPlayer1History(initialHistory1);
    setPlayer2History(initialHistory2);
  }, [updateInterval, player1.value, player2.value]); // Include player values for initial price calculation

  // Update price history when player values change with smooth animation
  // This simulates real market data that would come from Chainlink/Pyth
  useEffect(() => {
    // Only update if we have previous values to compare
    if (!player1.prevValue || !player2.prevValue) return;

    // Only process changes when values actually change
    if (player1.value === player1.prevValue && player2.value === player2.prevValue) return;

    const now = Date.now();
    setAnimating(true);

    // Get the current percentage changes
    const player1PctChange = player1.pnl || 0;
    const player2PctChange = player2.pnl || 0;

    // Get the last values from history
    const lastPlayer1Value = player1History.length > 0
      ? player1History[player1History.length - 1].value
      : 0;

    const lastPlayer2Value = player2History.length > 0
      ? player2History[player2History.length - 1].value
      : 0;

    // Target values (as decimal, not percentage)
    const targetPlayer1Value = player1PctChange / 100;
    const targetPlayer2Value = player2PctChange / 100;

    // Determine trends based on price movement
    const player1Trend = player1.value > player1.prevValue ? 'up' :
                         player1.value < player1.prevValue ? 'down' : 'neutral';

    const player2Trend = player2.value > player2.prevValue ? 'up' :
                         player2.value < player2.prevValue ? 'down' : 'neutral';

    // Create interpolation steps for smooth animation
    let step = 0;
    const animationInterval = setInterval(() => {
      step++;

      // Calculate interpolated values with easing function for more natural movement
      // Using cubic easing for more realistic price movement
      const progress = easeInOutCubic(step / interpolationSteps);

      const interpolatedPlayer1Value = lastPlayer1Value + (targetPlayer1Value - lastPlayer1Value) * progress;
      const interpolatedPlayer2Value = lastPlayer2Value + (targetPlayer2Value - lastPlayer2Value) * progress;

      // Add some micro-fluctuations to simulate real market data
      // These small variations make the chart look more realistic
      const microFluctuation1 = (Math.random() * 0.0004) - 0.0002; // Tiny random noise
      const microFluctuation2 = (Math.random() * 0.0004) - 0.0002; // Tiny random noise

      // Update histories with interpolated values
      const newValue1 = interpolatedPlayer1Value + microFluctuation1;
      const newValue2 = interpolatedPlayer2Value + microFluctuation2;

      // Check if we need to update the Y-axis scale
      const minValue = Math.min(newValue1, newValue2);
      const maxValue = Math.max(newValue1, newValue2);

      if (minValue < priceExtremes.min || maxValue > priceExtremes.max) {
        // Update price extremes
        setPriceExtremes(prev => ({
          min: Math.min(prev.min, minValue),
          max: Math.max(prev.max, maxValue)
        }));

        // Adjust Y-axis scale with padding
        const padding = 0.02; // 2% padding
        setYAxisScale({
          min: Math.min(minValue - padding, -0.05),
          max: Math.max(maxValue + padding, 0.05),
          mid: 0
        });
      }

      setPlayer1History(prev => {
        const newHistory = [...prev, {
          value: newValue1,
          timestamp: now + (step * (updateInterval / interpolationSteps)),
          rawPrice: player1.value * (1 + newValue1),
          trend: player1Trend
        }];
        return newHistory.slice(-maxHistoryPoints);
      });

      setPlayer2History(prev => {
        const newHistory = [...prev, {
          value: newValue2,
          timestamp: now + (step * (updateInterval / interpolationSteps)),
          rawPrice: player2.value * (1 + newValue2),
          trend: player2Trend
        }];
        return newHistory.slice(-maxHistoryPoints);
      });

      // Stop animation when we reach the target
      if (step >= interpolationSteps) {
        clearInterval(animationInterval);
        setAnimating(false);
      }
    }, updateInterval / interpolationSteps); // Divide the update interval by steps for smooth animation

    // Cleanup
    return () => clearInterval(animationInterval);
  }, [player1.value, player2.value, player1.pnl, player2.pnl, player1.prevValue, player2.prevValue,
      player1History, player2History, updateInterval, priceExtremes.min, priceExtremes.max]);

  // Easing function for more natural price movements
  const easeInOutCubic = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - ((-2 * t + 2) ** 3) / 2;
  };

  // Generate path for price line with enhanced visualization
  const generatePricePath = (priceHistory: PricePoint[]) => {
    if (dimensions.width === 0 || priceHistory.length < 2) return '';

    // Generate main path
    const points = priceHistory.map((point, index) => {
      // X position based on index
      const x = (index / (maxHistoryPoints - 1)) * dimensions.width;

      // Y position based on price value (normalized to chart height)
      const normalizedY = (point.value - yAxisScale.min) / (yAxisScale.max - yAxisScale.min);
      const y = dimensions.height - (normalizedY * dimensions.height);

      return `${x},${y}`;
    });

    return `M${points.join(' L')}`;
  };

  // Generate trend indicators (dots) for significant price movements
  const generateTrendIndicators = (priceHistory: PricePoint[], color: string) => {
    if (dimensions.width === 0 || priceHistory.length < 2) return [];

    // Find significant price movements (larger than threshold)
    const significantPoints = priceHistory.filter((point, index) => {
      if (index === 0) return false;

      // Calculate change from previous point
      const prevPoint = priceHistory[index - 1];
      const change = Math.abs(point.value - prevPoint.value);

      // Consider it significant if change is more than 0.5%
      return change > 0.005;
    });

    // Generate indicators for significant points
    return significantPoints.map((point, index) => {
      const pointIndex = priceHistory.indexOf(point);

      // X position based on index in the original array
      const x = (pointIndex / (maxHistoryPoints - 1)) * dimensions.width;

      // Y position based on price value (normalized to chart height)
      const normalizedY = (point.value - yAxisScale.min) / (yAxisScale.max - yAxisScale.min);
      const y = dimensions.height - (normalizedY * dimensions.height);

      // Determine indicator color based on trend
      const indicatorColor = point.trend === 'up' ? '#22c55e' :
                             point.trend === 'down' ? '#ef4444' : color;

      return { x, y, color: indicatorColor, trend: point.trend };
    });
  };

  // Get end position for avatar
  const getEndPosition = (priceHistory: PricePoint[]) => {
    if (dimensions.width === 0 || priceHistory.length === 0) {
      return { x: 0, y: 0 };
    }

    const lastPoint = priceHistory[priceHistory.length - 1];
    const x = dimensions.width;

    // Y position based on price value (normalized to chart height)
    const normalizedY = (lastPoint.value - yAxisScale.min) / (yAxisScale.max - yAxisScale.min);
    const y = dimensions.height - (normalizedY * dimensions.height);

    return { x, y };
  };

  // Generate paths and indicators
  const player1Path = generatePricePath(player1History);
  const player2Path = generatePricePath(player2History);
  const player1EndPos = getEndPosition(player1History);
  const player2EndPos = getEndPosition(player2History);

  // Generate trend indicators for significant price movements
  const player1Indicators = generateTrendIndicators(player1History, player1.color);
  const player2Indicators = generateTrendIndicators(player2History, player2.color);

  return (
    <div className={`glass-panel ${compact ? 'p-2 sm:p-3' : 'p-4 sm:p-6'} rounded-xl border-t border-white/10 shadow-lg relative overflow-hidden ${className}`}>
      {/* Background glow effects */}
      <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 rounded-full filter blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neon-red/10 rounded-full filter blur-3xl" />

      {/* Responsive header section */}
      <div className={`flex flex-col gap-1 ${compact ? 'mb-2' : 'mb-4'}`}>
        {/* Title and update info */}
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h3 className={`font-bold ${compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'}`}>{title}</h3>
          <div className="text-[10px] text-gray-400 bg-gray-800/50 px-1.5 py-0.5 rounded-full">
            Updates every 5s
          </div>
        </div>

        {/* Player info - desktop layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Player 1 */}
          <div className="flex items-center gap-2">
            <Avatar image={player1.avatar} address={player1.address} size="sm" glowColor="blue" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{player1.id.toUpperCase()}</span>
                <span className="text-xs text-gray-400">(You)</span>
                {player1.pnl !== undefined && (
                  <div className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${
                    player1.pnl >= 0
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {player1.pnl >= 0 ? '↑' : '↓'} {Math.abs(player1.pnl).toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="text-neon-blue font-mono font-bold">${player1.value.toFixed(2)}</div>
            </div>
          </div>

          {/* Center info */}
          <div className="flex items-center gap-4">
            <div className="text-center px-3 py-1 rounded-lg bg-gray-800/50">
              <div className="text-xs text-gray-400">Oracle</div>
              <div className="text-sm font-medium">Chainlink</div>
            </div>

            <div className="text-center px-3 py-1 rounded-lg bg-gray-800/50">
              <div className="text-xs text-gray-400">Frequency</div>
              <div className="text-sm font-medium">5s</div>
            </div>
          </div>

          {/* Player 2 */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-sm font-medium">{player2.id.toUpperCase()}</span>
                <span className="text-xs text-gray-400">(Opponent)</span>
                {player2.pnl !== undefined && (
                  <div className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${
                    player2.pnl >= 0
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {player2.pnl >= 0 ? '↑' : '↓'} {Math.abs(player2.pnl).toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="text-neon-red font-mono font-bold">${player2.value.toFixed(2)}</div>
            </div>
            <Avatar image={player2.avatar} address={player2.address} size="sm" glowColor="red" />
          </div>
        </div>

        {/* Player info - mobile layout */}
        <div className="md:hidden">
          {/* Players side by side */}
          <div className="grid grid-cols-2 gap-1 mb-1">
            {/* Player 1 */}
            <div className={`flex items-center gap-1 p-1 rounded-lg bg-gray-800/30 ${compact ? 'text-xs' : 'text-sm'}`}>
              <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold text-[10px]">
                {player1.id.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-0.5">
                  <span className="font-medium truncate">{player1.id.toUpperCase()}</span>
                  {player1.pnl !== undefined && (
                    <span className={`${player1.pnl >= 0 ? 'text-green-400' : 'text-red-400'} text-[10px]`}>
                      {player1.pnl >= 0 ? '↑' : '↓'}{Math.abs(player1.pnl).toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="text-neon-blue font-mono font-bold text-[10px]">${player1.value.toFixed(2)}</div>
              </div>
            </div>

            {/* Player 2 */}
            <div className={`flex items-center gap-1 p-1 rounded-lg bg-gray-800/30 ${compact ? 'text-xs' : 'text-sm'}`}>
              <div className="w-5 h-5 rounded-full bg-neon-red/20 flex items-center justify-center text-neon-red font-bold text-[10px]">
                {player2.id.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-0.5">
                  <span className="font-medium truncate">{player2.id.toUpperCase()}</span>
                  {player2.pnl !== undefined && (
                    <span className={`${player2.pnl >= 0 ? 'text-green-400' : 'text-red-400'} text-[10px]`}>
                      {player2.pnl >= 0 ? '↑' : '↓'}{Math.abs(player2.pnl).toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="text-neon-red font-mono font-bold text-[10px]">${player2.value.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Oracle info in a row - only show if not compact */}
          {!compact && (
            <div className="flex justify-center gap-2 text-[10px]">
              <div className="text-center px-1.5 py-0.5 rounded-lg bg-gray-800/50">
                <span className="text-gray-400">Oracle:</span> Chainlink
              </div>
              <div className="text-center px-1.5 py-0.5 rounded-lg bg-gray-800/50">
                <span className="text-gray-400">Updates:</span> 5s
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`relative ${compact ? 'h-[180px] sm:h-[220px]' : 'h-[250px] md:h-[300px]'}`}>
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 300}`}
          preserveAspectRatio="none"
          aria-label="Token price battle chart"
          role="img"
        >
          {/* Y-axis labels */}
          <text x="5" y="15" fill="#666" fontSize="10">+{(yAxisScale.max * 100).toFixed(1)}%</text>
          <text x="5" y={dimensions.height / 2} fill="#666" fontSize="10">{(yAxisScale.mid * 100).toFixed(1)}%</text>
          <text x="5" y={dimensions.height - 5} fill="#666" fontSize="10">{(yAxisScale.min * 100).toFixed(1)}%</text>

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

          {/* Player 1 line */}
          <path
            d={player1Path}
            fill="none"
            stroke={player1.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Player 2 line */}
          <path
            d={player2Path}
            fill="none"
            stroke={player2.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Trend indicators for player 1 */}
          {player1Indicators.map((indicator, index) => {
            // Create a unique key using position and timestamp
            const uniqueKey = `p1-${indicator.x.toFixed(0)}-${indicator.y.toFixed(0)}-${Date.now()}-${index}`;
            return (
              <g key={uniqueKey}>
                {/* Glow effect for indicators */}
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r="4"
                  fill={indicator.color}
                  opacity="0.5"
                />
                {/* Main indicator dot */}
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r="2"
                  fill={indicator.color}
                />
              </g>
            );
          })}

          {/* Trend indicators for player 2 */}
          {player2Indicators.map((indicator, index) => {
            // Create a unique key using position and timestamp
            const uniqueKey = `p2-${indicator.x.toFixed(0)}-${indicator.y.toFixed(0)}-${Date.now()}-${index}`;
            return (
              <g key={uniqueKey}>
                {/* Glow effect for indicators */}
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r="4"
                  fill={indicator.color}
                  opacity="0.5"
                />
                {/* Main indicator dot */}
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r="2"
                  fill={indicator.color}
                />
              </g>
            );
          })}

          {/* Current price markers */}
          <circle
            cx={player1EndPos.x}
            cy={player1EndPos.y}
            r="4"
            fill={player1.color}
            stroke="#000"
            strokeWidth="1"
          />
          <circle
            cx={player2EndPos.x}
            cy={player2EndPos.y}
            r="4"
            fill={player2.color}
            stroke="#000"
            strokeWidth="1"
          />
        </svg>

        {/* Player 1 Avatar with price info - animated - desktop */}
        <motion.div
          className="absolute hidden md:block"
          initial={{ x: player1EndPos.x - 120, y: player1EndPos.y - 16 }}
          animate={{ x: player1EndPos.x - 120, y: player1EndPos.y - 16 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
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
        </motion.div>

        {/* Player 2 Avatar with price info - animated - desktop */}
        <motion.div
          className="absolute hidden md:block"
          initial={{ x: player2EndPos.x - 120, y: player2EndPos.y - 16 }}
          animate={{ x: player2EndPos.x - 120, y: player2EndPos.y - 16 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
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
        </motion.div>

        {/* Player 1 Avatar - mobile (simplified) */}
        <motion.div
          className="absolute md:hidden"
          initial={{ x: player1EndPos.x - 16, y: player1EndPos.y - 16 }}
          animate={{ x: player1EndPos.x - 16, y: player1EndPos.y - 16 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
          }}
        >
          <div className="flex items-center justify-center">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-full h-8 w-8 flex items-center justify-center border border-blue-500/50">
              <div className={`text-xs font-mono ${player1.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {player1.pnl >= 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player 2 Avatar - mobile (simplified) */}
        <motion.div
          className="absolute md:hidden"
          initial={{ x: player2EndPos.x - 16, y: player2EndPos.y - 16 }}
          animate={{ x: player2EndPos.x - 16, y: player2EndPos.y - 16 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
          }}
        >
          <div className="flex items-center justify-center">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-full h-8 w-8 flex items-center justify-center border border-red-500/50">
              <div className={`text-xs font-mono ${player2.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {player2.pnl >= 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PriceLineChart;
