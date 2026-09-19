/**
 * Leaderboard Domain Data & Configuration
 * Single source of truth for competition standings, filters, and scoring thresholds.
 */

export const MAX_SCORE = 10000;

export const COLLEGES_FILTER_OPTIONS = [
  'ALL',
  'IIT Madras',
  'Anna University',
  'SRM Institute',
  'SSN College of Eng.',
  'VIT Chennai',
  'PSG Tech',
  'St. Joseph’s Eng.'
];

export const LEADERBOARD_DATA = [
  {
    rank: 1,
    team: 'Code Titans',
    college: 'IIT Madras',
    project: 'NeuralMesh AI',
    challenges: 5,
    score: 9850,
    status: 'EVALUATED'
  },
  {
    rank: 2,
    team: 'Neural Ninjas',
    college: 'Anna University',
    project: 'CyberShield Zero',
    challenges: 5,
    score: 9210,
    status: 'EVALUATED'
  },
  {
    rank: 3,
    team: 'Runtime Rebels',
    college: 'SRM Institute',
    project: 'FinPulse Protocol',
    challenges: 4,
    score: 8890,
    status: 'EVALUATED'
  },
  {
    rank: 4,
    team: 'Pixel Pirates',
    college: 'SSN College of Eng.',
    project: 'VisionHealth AI',
    challenges: 4,
    score: 8420,
    status: 'LIVE DEMO'
  },
  {
    rank: 5,
    team: 'Binary Brawlers',
    college: 'VIT Chennai',
    project: 'EcoGrid Smart City',
    challenges: 4,
    score: 8150,
    status: 'LIVE DEMO'
  },
  {
    rank: 6,
    team: 'Quantum Hackers',
    college: 'PSG Tech',
    project: 'Decentralized Identity',
    challenges: 3,
    score: 7900,
    status: 'SUBMITTED'
  },
  {
    rank: 7,
    team: 'Algorithm Aces',
    college: 'IIT Madras',
    project: 'Autonomous Drone Swarm',
    challenges: 3,
    score: 7640,
    status: 'SUBMITTED'
  },
  {
    rank: 8,
    team: 'Byte Benders',
    college: 'Anna University',
    project: 'MedGuard EHR',
    challenges: 3,
    score: 7320,
    status: 'SUBMITTED'
  },
  {
    rank: 9,
    team: 'Stack Overflow',
    college: 'St. Joseph’s Eng.',
    project: 'AquaSense IoT',
    challenges: 3,
    score: 7100,
    status: 'SUBMITTED'
  },
  {
    rank: 10,
    team: 'Cyber Sentinels',
    college: 'SRM Institute',
    project: 'ZeroTrust Auth Gateway',
    challenges: 3,
    score: 6850,
    status: 'SUBMITTED'
  }
];

