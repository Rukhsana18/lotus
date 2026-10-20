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
    path: 'virtual',
    renderMode: RenderMode.Server,
  },
  {
    path: 'virtual/:virtualId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'virtual/:virtualId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'football',
    renderMode: RenderMode.Server,
  },
  {
    path: 'football/:footballId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'football/:footballId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tennis',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tennis/:tennisId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tennis/:tennisId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'american-football',
    renderMode: RenderMode.Server,
  },
  {
    path: 'american-football/:leagueId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'american-football/:leagueId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'basketball',
    renderMode: RenderMode.Server,
  },
  {
    path: 'basketball/:leagueId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'basketball/:leagueId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'baseball',
    renderMode: RenderMode.Server,
  },
  {
    path: 'baseball/:leagueId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'baseball/:leagueId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'horse-racing',
    renderMode: RenderMode.Server,
  },
  {
    path: 'greyhound-racing',
    renderMode: RenderMode.Server,
  },
  {
    path: 'mixed-martial-arts',
    renderMode: RenderMode.Server,
  },
  {
    path: 'mixed-martial-arts/:leagueId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'mixed-martial-arts/:leagueId/match/:matchId',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
