import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Song } from '../../interfaces/songs';
import { ALL_SONGS, PLAYLISTS } from '../../constants';
import { SharedDataService } from '../../services/shared-data.service';
import { PlaylistListComponent } from '../playlist-list/playlist-list.component';
import _ from 'lodash';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlists';
import { PlaylistComponent } from '../playlists/playlist/playlist.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PlaylistListComponent, PlaylistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent{

  recentlyPlayed: Song[] = _.sampleSize(ALL_SONGS, 7);
  playlists = PLAYLISTS;

  recommendedSongs = _.sampleSize(ALL_SONGS, 7);
  recentlyPlayedPlaylist = new Playlist('recent', 'Recently Played', this.recentlyPlayed);
  recommendedPlaylist = new Playlist('recommended', 'Recommended', this.recommendedSongs);

  constructor(
    public sharedDataService:SharedDataService,
    private _router: Router,
  ) { }

  onPlayPlaylist(event: {playListId: string | number, songs: Song[]}) {
    const playlist = this.playlists.find((playlist) => event.playListId === playlist.id);
    this.sharedDataService.currentPlayingPlaylist = playlist || null;
    this.sharedDataService.currentSong = playlist?.songs[0] || null;
  }
  onPlaylistClicked($event: string | number) {
    this._router.navigate(['playlists',$event]);
  }
}
