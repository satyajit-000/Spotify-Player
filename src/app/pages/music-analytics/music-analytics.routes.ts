import { Routes } from '@angular/router';

export const MUSIC_ANALYTICS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent),
      },
      {
        path: 'languages',
        loadComponent: () => import('./language/language.component').then(m => m.LanguageComponent),
      },
      {
        path: 'genres',
        loadComponent: () => import('./genres/genres.component').then(m => m.GenresComponent),
      },
      {
        path: 'artists',
        loadComponent: () => import('./artists/artists.component').then(m => m.ArtistsComponent),
      },
      {
        path: 'timeline',
        loadComponent: () => import('./timeline/timeline.component').then(m => m.TimelineComponent),
      },
      {
        path: 'sources',
        loadComponent: () => import('./sources/sources.component').then(m => m.SourcesComponent),
      }
      

    ]
  }
]
