import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@/components/Avatar';

export interface RankingData {
  id: string;
  name: string;
  value: number;
  color: string;
  avatar?: string;
  address?: string;
  change?: number;
}

interface RankingChartProps {
  data: RankingData[];
  title?: string;
  maxItems?: number;
  updateInterval?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

const RankingChart: React.FC<RankingChartProps> = ({
  data,
  title = 'Real-time Ranking',
  maxItems = 5,
  updateInterval = 5000,
  formatValue = (value) => `$${value.toFixed(2)}`,
  className = '',
}) => {
  const [sortedData, setSortedData] = useState<RankingData[]>([]);
  const [prevPositions, setPrevPositions] = useState<Record<string, number>>({});
  const [maxValue, setMaxValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort and limit data
  useEffect(() => {
    const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, maxItems);

    // Calculate max value for bar scaling
    const max = Math.max(...sorted.map(item => item.value));
    setMaxValue(max);

    // Track position changes
    const positions: Record<string, number> = {};
    sorted.forEach((item, index) => {
      positions[item.id] = index;
    });

    setSortedData(sorted);
    setPrevPositions(positions);
  }, [data, maxItems]);

  return (
    <div className={`glass-panel p-6 rounded-xl border-t border-white/10 shadow-lg relative overflow-hidden ${className}`} ref={containerRef}>
      {/* Background glow effects */}
      <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 rounded-full filter blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neon-red/10 rounded-full filter blur-3xl" />

      <h3 className="font-bold text-xl mb-6">{title}</h3>

      <div className="space-y-4">
        <AnimatePresence>
          {sortedData.map((item, index) => {
            const prevPosition = prevPositions[item.id] !== undefined ? prevPositions[item.id] : index;
            const positionChange = prevPosition - index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.05
                  }
                }}
                exit={{ opacity: 0, height: 0 }}
                className="relative flex items-center gap-3 h-16"
                layout
              >
                {/* Rank number */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white font-bold">
                  {index + 1}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <Avatar
                    image={item.avatar}
                    address={item.address || ''}
                    size="md"
                    glowColor={index === 0 ? "blue" : index === 1 ? "red" : "orange"}
                  />

                  {/* Position change indicator */}
                  {positionChange !== 0 && (
                    <motion.div
                      className={`absolute -top-2 -right-2 text-xs px-1 rounded-full ${
                        positionChange > 0
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                    >
                      {positionChange > 0 ? '↑' : '↓'}{Math.abs(positionChange)}
                    </motion.div>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 font-medium truncate">
                  {item.name}
                </div>

                {/* Value bar */}
                <div className="flex-1 h-8 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-r-full opacity-20"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / maxValue) * 100}%`,
                      transition: { duration: 1, ease: 'easeOut' }
                    }}
                  />

                  <motion.div
                    className="absolute top-0 left-0 h-2 rounded-r-full"
                    style={{ backgroundColor: item.color, top: '12px' }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / maxValue) * 100}%`,
                      transition: { duration: 1, ease: 'easeOut' }
                    }}
                  />

                  {/* Pulse effect for value changes */}
                  {item.change !== 0 && (
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-r-full"
                      style={{
                        backgroundColor: item.change > 0 ? '#4ade80' : '#f87171',
                        width: `${(item.value / maxValue) * 100}%`
                      }}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </div>

                {/* Value */}
                <div className="w-24 text-right font-mono font-bold" style={{ color: item.color }}>
                  {formatValue(item.value)}

                  {item.change !== undefined && (
                    <div className={`text-xs ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RankingChart;
