export interface SubLeague {
  id: string;
  name: string;
  count: number;
  isVirtual?: boolean;
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
      { id: '7', name: 'Quantum Cricket League', count: 5, isVirtual: true }
    ]
  },
  {
    id: 'virtual-sports',
    title: 'Virtual Sports',
    icon: 'icon-virtual-sports',
    route: '/virtual'
  },
  {
    id: 'football',
    title: 'Football',
    icon: 'icon-sport-football',
    route: '/football',
    subLeagues: [
      { id: '1', name: 'Australian Football', count: 1 },
      { id: '2', name: 'Belgian Football', count: 1 },
      { id: '3', name: 'Brazilian Football', count: 1 },
      { id: '4', name: 'CONMEBOL Football', count: 1 },
      { id: '5', name: 'Chilean Football', count: 5 },
      { id: '6', name: 'Colombian Football', count: 2 },
      { id: '7', name: 'Danish Football', count: 5 },
      { id: '8', name: 'Dutch Football', count: 5 },
      { id: '9', name: 'Egyptian Football', count: 5 },
      { id: '10', name: 'English Football', count: 5 },
      { id: '11', name: 'French Football', count: 5 },
      { id: '12', name: 'German Football', count: 5 },
      { id: '13', name: 'Indonesian Football', count: 5 },
      { id: '14', name: 'International Football', count: 5 },
      { id: '15', name: 'Italian Football', count: 5 },
      { id: '16', name: 'Japanese Football', count: 5 },
      { id: '17', name: 'Mexican Football', count: 5 },
      { id: '18', name: 'Northern Ireland Football', count: 5 },
      { id: '19', name: 'Saudi Football', count: 5 },
      { id: '20', name: 'Scottish Football', count: 5 },
      { id: '21', name: 'Spanish Football', count: 5 },
      { id: '22', name: 'Swedish Football', count: 5 },
      { id: '23', name: 'UEFA Football', count: 5 },
      { id: '24', name: 'US Football', count: 5 },
    ]
  },
  {
    id: 'tennis',
    title: 'Tennis',
    icon: 'icon-sport-tennis',
    route: '/tennis',
    subLeagues: [
      { id: '1', name: 'ATP Almaty 2026', count: 1 },
      { id: '2', name: 'ATP Brussels 2026', count: 1 },
      { id: '3', name: 'ATP Lyon 2026', count: 1 },
      { id: '4', name: 'WTA Ningbo 2026', count: 1 },
      { id: '5', name: 'WTA Osaka 2026', count: 5 },
      { id: '6', name: 'Florence Challenger 2026', count: 2 },
      { id: '7', name: 'Fort Worth TX Challenger 2026', count: 5 },
      { id: '7', name: 'Guangzhou Challenger 2026', count: 5 },
      { id: '7', name: 'Lisbon Challenger 2026', count: 5 },
      { id: '7', name: 'Santiago de Cali Challenger 2026', count: 5 },
      { id: '7', name: 'ITF W100 Wrexham GBR', count: 5 },
      { id: '7', name: 'ITF W50 Cherbourg-en-Cotentin FRA', count: 5 },
      { id: '7', name: 'ITF W75 Saguenay CAN', count: 5 }
    ]
  },
  {
    id: 'american-football',
    title: 'American Football',
    icon: 'icon-sport-americanfootball',
    route: '/american-football',
    subLeagues: [
      { id: '1', name: 'NCAA', count: 1 },
      { id: '2', name: 'NFL', count: 1 }
    ]
  },
  {
    id: 'basketball',
    title: 'Basketball',
    icon: 'icon-sport-basketball',
    route: '/basketball',
    subLeagues: [
      { id: '1', name: 'Australia - NBL', count: 1 },
      { id: '2', name: 'China - CBA', count: 1 },
      { id: '3', name: 'NBA', count: 1 }
    ]
  },
  {
    id: 'horse-racing',
    title: 'Horse Racing',
    icon: 'icon-sport-horseracing',
    route: '/horse-racing'
  },
  {
    id: 'greyhound-racing',
    title: 'Greyhound Racing',
    icon: 'icon-sport-greyhoundracing',
    route: '/greyhound-racing'
  },
  {
    id: 'baseball',
    title: 'Baseball',
    icon: 'icon-sport-baseball',
    route: '/baseball',
    subLeagues: [
      { id: '1', name: 'Chinese Taipei - Professional League', count: 1 },
      { id: '2', name: 'Korea Professional Baseball', count: 1 },
      { id: '3', name: 'MLB', count: 1 }
    ]
  },
  {
    id: 'mma',
    title: 'Mixed Martial Arts',
    icon: 'icon-sport-mixedmartialarts',
    route: '/mixed-martial-arts',
    subLeagues: [
      { id: '1', name: 'UFC', count: 1 }
    ]
  }
];