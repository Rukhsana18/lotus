export interface SubLeague {
  id: string;
  name: string;
  count: number;
}

export interface SidebarCategory {
  id: string;
  title: string;
  icon: string;
  route: string;
  subLeagues?: SubLeague[];
}

export const SPORTS_SIDEBAR_DATA: SidebarCategory[] = [
  {
    id: 'cricket',
    title: 'Cricket',
    icon: 'icon-sport-cricket',
    route: '/sports',
    subLeagues: [
      { id: '1', name: 'International Twenty20...', count: 1 },
      { id: '2', name: 'One Day Internationals', count: 1 },
      { id: '3', name: 'Test Matches', count: 1 },
      { id: '4', name: 'Womens International ...', count: 1 },
      { id: '5', name: 'South Africa T20 Challe...', count: 5 },
      { id: '6', name: 'World Championship of...', count: 2 },
      { id: '7', name: 'Quantum Cricket League', count: 5 }
    ]
  },
  {
    id: 'virtual-sports',
    title: 'Virtual Sports',
    icon: 'icon-virtual-sports',
    route: '/sports'
  },
  {
    id: 'football',
    title: 'Football',
    icon: 'icon-sport-football',
    route: '/sports'
  },
  {
    id: 'tennis',
    title: 'Tennis',
    icon: 'icon-sport-tennis',
    route: '/sports'
  },
  {
    id: 'american-football',
    title: 'American Football',
    icon: 'icon-sport-americanfootball',
    route: '/sports'
  },
  {
    id: 'basketball',
    title: 'Basketball',
    icon: 'icon-sport-basketball',
    route: '/sports'
  },
  {
    id: 'horse-racing',
    title: 'Horse Racing',
    icon: 'icon-sport-horseracing',
    route: '/sports'
  },
  {
    id: 'greyhound-racing',
    title: 'Greyhound Racing',
    icon: 'icon-sport-greyhoundracing',
    route: '/sports'
  },
  {
    id: 'baseball',
    title: 'Baseball',
    icon: 'icon-sport-baseball',
    route: '/sports'
  },
  {
    id: 'mma',
    title: 'Mixed Martial Arts',
    icon: 'icon-sport-mixedmartialarts',
    route: '/sports'
  }
];