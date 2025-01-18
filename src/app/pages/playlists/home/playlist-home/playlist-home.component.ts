import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PLAYLISTS } from '../../../../constants';
import { Song } from '../../../../interfaces/songs';
import { Playlist } from '../../../../models/playlists';
import { SharedDataService } from '../../../../services/shared-data.service';
import { PlaylistListComponent } from '../../../playlist-list/playlist-list.component';

@Component({
  selector: 'app-playlist-home',
  imports: [PlaylistListComponent],
  templateUrl: './playlist-home.component.html',
  styleUrl: './playlist-home.component.css'
})
export class PlaylistHomeComponent {

    playlists = PLAYLISTS;
    isChildRouteActive = signal(false);
  
    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _sharedDataService: SharedDataService
    ) { }
  
    onClickPlaylist($event: string | number) {
      this._router.navigate([$event], { relativeTo: this._route });
    }
    onClickplayPlaylist(event:{playListId: string | number, songs: Song[]}) {
  
      const playlist = this.playlists.find((playlist: Playlist) => event.playListId === playlist.id);
      this._sharedDataService.currentPlayingPlaylist = playlist || null;
      this._sharedDataService.currentSong = playlist?.songs[0] || null;
    }
}
