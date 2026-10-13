import { Routes } from '@angular/router';
import { SportsPage } from './pages/sports/sports';
import { CasinoPage } from './pages/casino/casino';
import { SearchPage } from './pages/search/search';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: SportsPage, title: 'Home | Lotus' },
  { path: 'search', component: SearchPage, title: 'Search | Lotus' },
  {
    path: 'sports',
    children: [
      { path: '', component: SportsPage, title: 'Sports | Lotus' },
      { path: ':sport', component: SportsPage, title: 'Sports | Lotus' },
      { path: ':sport/:competition', component: SportsPage, title: 'Sports | Lotus' },
    ],
  },
  {
    path: 'casino',
    children: [
      { path: '', component: CasinoPage, title: 'Casino | Lotus' },
      { path: ':category', component: CasinoPage, title: 'Casino | Lotus' },
      { path: ':category/:gameId', component: CasinoPage, title: 'Casino | Lotus' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
