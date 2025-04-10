import { Routes } from "@angular/router";
import { PlaylistComponent } from "./playlist/playlist.component";
import { PlaylistHomeComponent } from "./home/playlist-home/playlist-home.component";

export const routes: Routes = [
    { path: '', component: PlaylistHomeComponent },
    { path: ':id', component: PlaylistComponent },
]
