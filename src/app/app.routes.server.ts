import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'sports/:sport/:competition',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sports/:sport',
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
