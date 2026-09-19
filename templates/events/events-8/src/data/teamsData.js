/**
 * Teams Domain Data & Configuration
 * Single source of truth for matchmaking teams, skill filters, and categories.
 */

export const SKILLS_LIST = [
  'React',
  'Python',
  'AI',
  'UI/UX',
  'Java',
  'C++',
  'Cybersecurity',
  'Cloud',
  'Robotics'
];

export const SKILLS_FILTER_OPTIONS = ['ALL', ...SKILLS_LIST];

export const AVAILABLE_TEAMS = [
  {
    id: 1,
    name: 'Neural Overlords',
    captain: 'Alex Rivera',
    college: 'IIT Madras',
    membersNeeded: 1,
    requiredSkills: ['AI', 'Python'],
    projectTrack: 'AI & Machine Learning'
  },
  {
    id: 2,
    name: 'Cyber Phantom',
    college: 'Anna University',
    captain: 'Priya Sharma',
    membersNeeded: 2,
    requiredSkills: ['Cybersecurity', 'C++'],
    projectTrack: 'Cybersecurity'
  },
  {
    id: 3,
    name: 'Quantum Coders',
    college: 'SRM Institute',
    captain: 'Rohan Gupta',
    membersNeeded: 1,
    requiredSkills: ['React', 'UI/UX'],
    projectTrack: 'Web & App Development'
  },
  {
    id: 4,
    name: 'RoboBytes',
    college: 'VIT Chennai',
    captain: 'Karthik Raja',
    membersNeeded: 2,
    requiredSkills: ['Robotics', 'C++'],
    projectTrack: 'Smart Cities'
  },
  {
    id: 5,
    name: 'Cloud Architects',
    college: 'SSN College',
    captain: 'Ananya Roy',
    membersNeeded: 1,
    requiredSkills: ['Cloud', 'Java'],
    projectTrack: 'FinTech'
  }
];
