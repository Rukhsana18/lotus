import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'sports',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sports/league/:leagueId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sports/league/:leagueId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'casino',
    renderMode: RenderMode.Server,
  },
  {
    path: 'casino/:category/:gameId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'casino/:category',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
