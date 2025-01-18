import { Routes } from "@angular/router";
import { PlaylistComponent } from "./playlist/playlist.component";

export const playListRoutes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: ':id', component: PlaylistComponent },
]