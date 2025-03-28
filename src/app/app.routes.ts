import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { 
      path: 'playlists', 
      loadChildren: () => import('./pages/playlists/playlist.routes').then(m => m.routes),
    },    
    { path: 'favorites', component: FavoritesComponent },
    {path: '**', redirectTo:'home'}
  ];
