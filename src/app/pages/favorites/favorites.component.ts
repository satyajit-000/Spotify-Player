import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ALL_SONGS } from '../../constants';
import { Song } from '../../interfaces/songs';
import { Playlist } from '../../models/playlists';
import { PlaylistComponent } from '../playlists/playlist/playlist.component';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-favorites',
  imports: [ PlaylistComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {

  private sharedDataService = inject(SharedDataService);

  favoriteSongs = computed<Song[]>(() => {
    const favoriteSongUrls: string[] = this.sharedDataService.favoriteSongUrls();
    return ALL_SONGS.filter((song:Song) => favoriteSongUrls.includes(song.song_url));
  });

  favoriteSongPlaylist = computed(() => new Playlist('favorites', 'Favorites', this.favoriteSongs()));

}
