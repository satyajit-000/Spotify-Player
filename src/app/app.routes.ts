import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
// import { playListRoutes } from './pages/playlists/playlist.routes';

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
