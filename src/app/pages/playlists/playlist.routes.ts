import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/playlist-home/playlist-home.component').then(m => m.PlaylistHomeComponent) },
    { path: ':id', loadComponent: () => import('./playlist/playlist.component').then(m => m.PlaylistComponent) },
]
