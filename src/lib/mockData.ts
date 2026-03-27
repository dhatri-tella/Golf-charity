import { Charity } from '../types';

export const MOCK_CHARITIES: Charity[] = [
  {
    id: 'charity-1',
    name: 'Global Golf Foundation',
    description: 'Empowering underprivileged youth through golf programs and scholarships globally.',
    logo_url: '/logo1.png',
    images: [],
    website: 'https://example.com',
    is_featured: true,
    events: [],
    total_raised: 45000,
  },
  {
    id: 'charity-2',
    name: 'Fairways for Water',
    description: 'Building sustainable water wells in developing nations using tournament proceeds.',
    logo_url: '/logo2.png',
    images: [],
    website: 'https://example.com',
    is_featured: false,
    events: [],
    total_raised: 28000,
  },
  {
    id: 'charity-3',
    name: 'Birdies against Cancer',
    description: 'Funding vital cancer research and providing immediate support for patients and families.',
    logo_url: '/logo3.png',
    images: [],
    website: 'https://example.com',
    is_featured: true,
    events: [],
    total_raised: 125000,
  },
  {
    id: 'charity-4',
    name: 'Tee Off for Trees',
    description: 'Planting a tree for every round played by our amazing community of golfers.',
    logo_url: '/logo4.png',
    images: [],
    website: 'https://example.com',
    is_featured: false,
    events: [],
    total_raised: 12000,
  }
];
