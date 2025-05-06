
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Battle from '@/components/Battle';
import { mockActions } from '@/data/mockData';
import { Action } from '@/components/ActionLog';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import Avatar from '@/components/Avatar';

const BattlePage = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [currentETH, setCurrentETH] = useState(3245.78);
  const [currentBTC, setCurrentBTC] = useState(52136.42);
  
  // Generate random price action for both tokens
  useEffect(() => {
    const initialData = Array.from({ length: 10 }).map((_, i) => {
      const baseETH = 3245.78;
      const baseBTC = 52136.42;
      const randomChangeETH = (Math.random() - 0.5) * 20;
      const randomChangeBTC = (Math.random() - 0.5) * 300;
      return {
        time: new Date(Date.now() - (10 - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ETH: baseETH + randomChangeETH,
        BTC: baseBTC + randomChangeBTC
      };
    });
    setPriceData(initialData);
    
    // Update price and action log every 5 seconds (was 60000ms / 1 min)
    const interval = setInterval(() => {
      // Update ETH price
      const lastETH = priceData[priceData.length - 1]?.ETH || 3245.78;
      const randomChangeETH = (Math.random() - 0.5) * 10;
      const newETH = lastETH + randomChangeETH;
      setCurrentETH(newETH);
      
      // Update BTC price
      const lastBTC = priceData[priceData.length - 1]?.BTC || 52136.42;
      const randomChangeBTC = (Math.random() - 0.5) * 200;
      const newBTC = lastBTC + randomChangeBTC;
      setCurrentBTC(newBTC);
      
      // Update price data for chart
      setPriceData(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ETH: newETH,
          BTC: newBTC
        }
      ].slice(-12)); // Keep only last 12 entries
      
      // Add price update to action log
      const priceAction: Action = {
        id: `action-${Date.now()}`,
        type: 'onchain',
        message: `ETH: $${newETH.toFixed(2)} (${randomChangeETH > 0 ? '+' : ''}${randomChangeETH.toFixed(2)}) | BTC: $${newBTC.toFixed(2)} (${randomChangeBTC > 0 ? '+' : ''}${randomChangeBTC.toFixed(2)})`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      
      setActions(prev => [...prev, priceAction]);
    }, 5000); // Changed to 5 seconds from 60000ms (1 min)
    
    return () => clearInterval(interval);
  }, []);
  
  // Mock player data
  const player1 = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    avatar: '/placeholder.svg',
    health: 75,
    maxHealth: 100,
    energy: 5,
    maxEnergy: 10,
    token: 'ETH'
  };
  
  const player2 = {
    address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    avatar: '/placeholder.svg',
    health: 85,
    maxHealth: 100,
    energy: 7,
    maxEnergy: 10,
    token: 'BTC'
  };
  
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
      player: player1.address,
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
        player: Math.random() > 0.3 ? player2.address : undefined,
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
  
  // Custom tooltip for the chart that includes player avatars
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-lg">
          <p className="text-sm mb-2">{label}</p>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                {entry.dataKey === 'ETH' && (
                  <Avatar image={player1.avatar} address={player1.address} size="sm" />
                )}
                {entry.dataKey === 'BTC' && (
                  <Avatar image={player2.avatar} address={player2.address} size="sm" />
                )}
                <div>
                  <span style={{ color: entry.stroke }}>{entry.dataKey}: </span>
                  <span className="font-mono">${entry.value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="container py-8">
      <div className="glass-panel p-6 rounded-xl mb-6 border-t border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">Real-time Token Price Battle</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Avatar image={player1.avatar} address={player1.address} size="sm" glowColor="blue" />
              <div>
                <span className="text-xs text-gray-400">You</span>
                <div className="text-neon-blue font-mono font-bold">${currentETH.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar image={player2.avatar} address={player2.address} size="sm" glowColor="red" />
              <div>
                <span className="text-xs text-gray-400">Opponent</span>
                <div className="text-neon-red font-mono font-bold">${currentBTC.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px] relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-neon-blue/20 text-neon-blue text-xs px-2 py-0.5 rounded-full">
            Updates every 5 seconds
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData} className="animate-fadeIn">
              <defs>
                <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis 
                yAxisId="ETH"
                domain={['dataMin - 10', 'dataMax + 10']} 
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                width={50}
                stroke="#6b7280"
              />
              <YAxis 
                yAxisId="BTC"
                orientation="right"
                domain={['dataMin - 150', 'dataMax + 150']} 
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                width={50}
                stroke="#6b7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => {
                  return value === "ETH" ? 
                    <span className="text-neon-blue">{player1.token} (You)</span> : 
                    <span className="text-neon-red">{player2.token} (Opponent)</span>;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ETH" 
                stroke="#4ade80" 
                yAxisId="ETH"
                activeDot={{ r: 8 }} 
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={3} fill="#4ade80" />
                      {props.index === priceData.length - 1 && (
                        <circle cx={cx} cy={cy} r={6} stroke="#4ade80" strokeWidth={1} fill="none" />
                      )}
                    </g>
                  );
                }}
                strokeWidth={2}
                name="ETH"
                fillOpacity={0.2}
                fill="url(#colorETH)"
              />
              <Line 
                type="monotone" 
                dataKey="BTC" 
                stroke="#f87171" 
                yAxisId="BTC"
                activeDot={{ r: 8 }} 
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={3} fill="#f87171" />
                      {props.index === priceData.length - 1 && (
                        <circle cx={cx} cy={cy} r={6} stroke="#f87171" strokeWidth={1} fill="none" />
                      )}
                    </g>
                  );
                }}
                strokeWidth={2}
                name="BTC"
                fillOpacity={0.2}
                fill="url(#colorBTC)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Battle
        player1={{...player1}}
        player2={{...player2}}
        stake={stake}
        timeRemaining={600} // 10 minutes
        actions={actions}
        onAction={handleAction}
        onForfeit={handleForfeit}
      />
    </div>
  );
};

export default BattlePage;
