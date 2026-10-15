import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home').then((m) => m.Home), 
    title: 'Home | Lotus' 
  },
  { 
    path: 'search', 
    loadComponent: () => import('./pages/search/search').then((m) => m.SearchPage), 
    title: 'Search | Lotus' 
  },
  {
    path: 'casino',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'casino/:category',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'casino/:category/:gameId',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'sports',
    loadComponent: () => import('./pages/sports/sports').then((m) => m.Sports),
    children: [
      {
        path: 'league/:leagueId',
        title: 'League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: 'league/:leagueId/match/:matchId',
        title: 'Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];