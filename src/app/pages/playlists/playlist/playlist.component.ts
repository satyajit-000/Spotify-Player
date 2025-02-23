import { ChangeDetectionStrategy, Component, computed, effect, input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SongListComponent } from '../../song-list/song-list.component';
import { Playlist } from '../../../models/playlists';
import { PLAYLISTS } from '../../../constants';
import { Song } from '../../../interfaces/songs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  imports: [SongListComponent, NzPaginationModule, CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../../../../css/pagination.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent implements OnInit {

  private playListId?: number;
  private filterCache = new Map<string, Song[]>();

  inputPlaylist = input<Playlist>();
  playList: Playlist = {} as Playlist;
  filteredSongs: WritableSignal<Song[]> = signal<Song[]>([]);
  currentIndex = -1;
  currentSong!: WritableSignal<Song | null | undefined>;

  pageSize = window.innerWidth > 1000 ? 50 : 100;
  pageIndex = 1;
  currentPageSongs: WritableSignal<Song[]> = signal([])

  customPageSizeOptions = [5, 10, 30, 50, 100]; // Page size values
  customPageSizeLabels = {
    5: 'Five Items',
    10: 'Ten Items',
    30: 'Thirty Items',
    50: 'Fifty Items',
    100: 'Hundred Items',
  };

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
    this.onPageSizeOrIndexChange();

  }

  backToPlaylist() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  private debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: any;
    return ((...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    }) as T;
  }

  filterSongs = this.debounce((text: string) => {
    const trimmedText = text.trim().toLowerCase();
    if (trimmedText.length < 2) {
      this.filteredSongs.set(this.playList.songs);
    } else {
      if (this.filterCache.has(trimmedText)) {
        this.filteredSongs.set(this.filterCache.get(trimmedText) || []);
      } else {
        const filtered = this.playList.songs.filter(song =>
          song.song_name.toLowerCase().includes(trimmedText)
        );
        this.filterCache.set(trimmedText, filtered);
        this.filteredSongs.set(filtered);
      }
    }
    this.onPageSizeOrIndexChange();
  }, 300);

  onClickSong(currSong: Song) {
    this._sharedDataService.currentPlayingPlaylist = this.playList;
    this._sharedDataService.currentSong = currSong;
  }


  onPageSizeOrIndexChange(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.filteredSongs().length);
    this.currentPageSongs.set(this.filteredSongs().slice(start, end));
    // document.querySelector('.song-list')?.scrollTo({ top: 0});
  }

  get isSimple():Signal<boolean> {
    return computed(()=>window.innerWidth <= 1070);
  }

  get innerWidth() {
    return computed(() => window.innerWidth)
  };
}
