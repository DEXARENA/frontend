
import type { Challenge } from '@/components/ChallengeCardCompact';
import type { Action } from '@/components/ActionLog';

// Generate a random Ethereum address
const randomAddress = () => {
  return `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
};

// Mock challenges
export const mockChallenges: Challenge[] = [
  {
    id: '1',
    creator: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    type: 'Ranked',
    stake: {
      amount: '0.5',
      token: 'ETH'
    },
    expiresIn: 300, // 5 minutes
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    creator: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    type: 'Casual',
    stake: {
      amount: '100',
      token: 'USDC'
    },
    expiresIn: 180, // 3 minutes
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    creator: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    type: 'Tournament',
    stake: {
      amount: '0.1',
      token: 'ETH'
    },
    expiresIn: 600, // 10 minutes
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    creator: {
      address: randomAddress(),
    },
    type: 'Ranked',
    stake: {
      amount: '250',
      token: 'USDC'
    },
    expiresIn: 450, // 7.5 minutes
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    creator: {
      address: randomAddress(),
    },
    type: 'Casual',
    stake: {
      amount: '50',
      token: 'USDC'
    },
    expiresIn: 240, // 4 minutes
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    creator: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    type: 'Tournament',
    stake: {
      amount: '1.5',
      token: 'ETH'
    },
    expiresIn: 900, // 15 minutes
    createdAt: new Date().toISOString()
  },
];

// Mock battle actions
export const mockActions: Action[] = [
  {
    id: '1',
    type: 'onchain',
    message: 'Battle started. Escrow contract created and funds locked.',
    timestamp: '12:01:15',
  },
  {
    id: '2',
    type: 'offchain',
    message: 'Player 1 joined the arena.',
    player: randomAddress(),
    timestamp: '12:01:30',
  },
  {
    id: '3',
    type: 'offchain',
    message: 'Player 2 joined the arena.',
    player: randomAddress(),
    timestamp: '12:01:45',
  },
  {
    id: '4',
    type: 'offchain',
    message: 'Player 1 attacks for 15 damage!',
    player: randomAddress(),
    timestamp: '12:02:10',
  },
  {
    id: '5',
    type: 'offchain',
    message: 'Player 2 defends and blocks 5 damage.',
    player: randomAddress(),
    timestamp: '12:02:25',
  },
  {
    id: '6',
    type: 'onchain',
    message: 'ZK Proof generated for attack sequence verification.',
    timestamp: '12:02:40',
  },
  {
    id: '7',
    type: 'offchain',
    message: 'Player 2 uses special attack for 25 damage!',
    player: randomAddress(),
    timestamp: '12:03:00',
  },
  {
    id: '8',
    type: 'offchain',
    message: 'Player 1 health reduced to 75.',
    player: randomAddress(),
    timestamp: '12:03:05',
  },
];

// Mock leaderboard data
export const mockLeaderboard = [
  {
    rank: 1,
    player: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    wins: 42,
    earnings: '15.8 ETH'
  },
  {
    rank: 2,
    player: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    wins: 37,
    earnings: '12.3 ETH'
  },
  {
    rank: 3,
    player: {
      address: randomAddress(),
      avatar: '/placeholder.svg',
    },
    wins: 29,
    earnings: '9.1 ETH'
  },
  {
    rank: 4,
    player: {
      address: randomAddress(),
      isAnonymous: true,
    },
    wins: 24,
    earnings: '7.5 ETH'
  },
  {
    rank: 5,
    player: {
      address: randomAddress(),
    },
    wins: 18,
    earnings: '5.2 ETH'
  },
  {
    rank: 6,
    player: {
      address: randomAddress(),
      isAnonymous: true,
    },
    wins: 15,
    earnings: '4.7 ETH'
  },
  {
    rank: 7,
    player: {
      address: randomAddress(),
    },
    wins: 12,
    earnings: '3.8 ETH'
  },
  {
    rank: 8,
    player: {
      address: randomAddress(),
    },
    wins: 10,
    earnings: '3.1 ETH'
  },
];
