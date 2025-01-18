import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaylistListComponent } from '../playlist-list/playlist-list.component';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { PLAYLISTS } from '../../constants';
import { SharedDataService } from '../../services/shared-data.service';
import { Playlist } from '../../models/playlists';
import { Song } from '../../interfaces/songs';
@Component({
  selector: 'app-playlists',
  imports: [PlaylistListComponent, RouterOutlet],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent {

  playlists = PLAYLISTS;
  isChildRouteActive = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _sharedDataService: SharedDataService
  ) {
    _router.events.subscribe(() => {
      this.isChildRouteActive = this._route.firstChild !== null
    });
  }

  onClickPlaylist($event: string | number) {
    this._router.navigate([$event], { relativeTo: this._route });
  }
  onClickplayPlaylist(event:{playListId: string | number, songs: Song[]}) {

    const playlist = this.playlists.find((playlist: Playlist) => event.playListId === playlist.id);
    this._sharedDataService.currentPlayingPlaylist = playlist || null;
    this._sharedDataService.currentSong = playlist?.songs[0] || null;
  }
}
