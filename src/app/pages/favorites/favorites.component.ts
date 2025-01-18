import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ALL_SONGS } from '../../constants';
import { Song } from '../../interfaces/songs';
import { Playlist } from '../../models/playlists';
import { PlaylistComponent } from '../playlists/playlist/playlist.component';

@Component({
  selector: 'app-favorites',
  imports: [ PlaylistComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  favoriteSongs = ALL_SONGS.filter((song:Song)=>song.isFavorite)
  favoriteSongPlaylist = new Playlist('favorites', 'Favorites', this.favoriteSongs);

}
