import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PLAYLISTS } from '../../constants';
import { Playlist } from '../../models/playlists';
import { Song } from '../../interfaces/songs';

@Component({
  selector: 'app-playlist-list',
  imports: [],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlaylistListComponent {
  playlistIndex: number | null = null;
  playlists = input.required<Playlist[]>();
  playListSectionTitle = input.required<string>();
  playlistClicked = output<number | string>();
  playPlaylist = output<{ playListId: number | string, songs: Song[] }>();

  onClickPlay($event: MouseEvent, playListId: number | string, songs: Song[]) {
    $event.stopPropagation();
    this.playPlaylist.emit({ playListId, songs });
  }

  onClickPlaylist(event: MouseEvent, playListId: number | string) {
    event.stopPropagation();
    this.playlistClicked.emit(playListId);

  }
}
