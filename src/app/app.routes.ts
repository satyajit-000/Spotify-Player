import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { playListRoutes } from './pages/playlists/playlist.routes';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'playlists', component: PlaylistsComponent, children: playListRoutes },
    // { 
    //   path: 'playlists', 
    //   loadComponent: () => import('./pages/playlists/playlists.component').then(c => c.PlaylistsComponent),
    //   children: playListRoutes,  // Nested routes for individual playlists
    // },    
    { path: 'favorites', component: FavoritesComponent },
  ];