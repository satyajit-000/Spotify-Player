import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./pages/playlists/playlist.routes').then(m => m.routes),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/music-analytics/music-analytics.component').then(m => m.MusicAnalyticsComponent),
    loadChildren: () => import('./pages/music-analytics/music-analytics.routes').then(m => m.MUSIC_ANALYTICS_ROUTES[0].children || [])
  },
  { path: '**', redirectTo: 'home' }
];
