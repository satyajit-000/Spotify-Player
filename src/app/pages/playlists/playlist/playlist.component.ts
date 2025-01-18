import { ChangeDetectionStrategy, Component, effect, input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SongListComponent } from '../../song-list/song-list.component';
import { Playlist } from '../../../models/playlists';
import { PLAYLISTS } from '../../../constants';
import { Song } from '../../../interfaces/songs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-playlist',
  imports: [SongListComponent, NzPaginationModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {

  inputPlaylist = input<Playlist>();
  playListId?: number;
  playList: Playlist = {} as Playlist;
  filteredSongs: WritableSignal<Song[]> = signal<Song[]>([]);
  currentIndex = -1;
  currentSong!: WritableSignal<Song | null | undefined>;


  constructor(
    private _sharedDataService: SharedDataService,
    private _router: Router,
    private _route: ActivatedRoute,


  ) {
    effect(() => {
      this.filterSongs(this._sharedDataService.filteredText);
      this.currentSong = this._sharedDataService.currentSong;
      this.currentIndex = this.playList.songs?.findIndex((song: Song) => this.currentSong()?.website === song.website);      
    })
  }

  ngOnInit() {
    if (this.inputPlaylist()) {
      this.playList = this.inputPlaylist() as Playlist;
    } else {
      this.playListId = Number(this._route.snapshot.params['id']);
      this.playList = PLAYLISTS.find((playlist: Playlist) => this.playListId === playlist.id) || {} as Playlist;
    }
    this.filteredSongs.set(this.playList.songs);

  }

  backToPlaylist() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  filterSongs(text: string) {
    if (!text.trim()) {
      this.filteredSongs.set(this.playList.songs);
      // scrollToCard(this.currentIndex + '');
    } else if (text.trim().length >= 2) {
      setTimeout(() => {
        this.filteredSongs.set(this.playList.songs.filter((song: Song) => song.song_name.toLowerCase().trim().includes(text.trim().toLowerCase())))
      }, 100);
    }
  }

  onClickSong(currSong: Song) {
    this._sharedDataService.currentPlayingPlaylist = this.playList;
    this._sharedDataService.currentSong = currSong;
  }

}
