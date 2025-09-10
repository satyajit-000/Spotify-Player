import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';
import { Song } from '../../interfaces/songs';
import { CommonModule } from '@angular/common';
import { ALL_SONGS, DEFAULT_THUMBNAIL } from '../../constants';
import { SharedDataService } from '../../services/shared-data.service';
import { downloadSong, retriveSource } from '../../utils';

@Component({
  selector: 'app-song-list',
  imports: [CommonModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongListComponent {
  playlistTitle = input.required<string>();
  songs = input.required<Song[]>()
  currentIndex = input<number>(-1);
  currentSong = input<Song | undefined | null>(null);
  songClicked = output<Song>();
  defaultThumbnail = DEFAULT_THUMBNAIL;
  optionsIndex: number | null = null;
  playingImage = 'https://i.gifer.com/Nt6v.gif';
  pauseImage = 'https://i.gifer.com/fetch/w300-preview/55/554818561cbf36d813ef2010cc9d66cc.gif';
  retriveSource = retriveSource
  clickTimeout: any; // Timer reference for click event
  favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]');
  smallScreen = window.innerWidth <= 800;

  constructor(public sharedDataService: SharedDataService) { }

  private checkScreenSize() {
    this.smallScreen = window.innerWidth <= 800;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  onSingleClick(event: MouseEvent, song: Song): void {
    // Set a timer to handle click delay
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout); // Clear any existing timeout to prevent duplicate clicks
    }

    this.clickTimeout = setTimeout(() => {
      this.onClick(event, song); // Call the single click handler
      this.clickTimeout = null; // Reset the timeout
    }, 250); // Delay to differentiate single click from double click

  }

  onDoubleClick(event: MouseEvent, song: Song): void {
    // Clear the click timeout to prevent single click execution
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }

    this.toggleFavorite(event, song); // Call the double-click handler
  }

  // Toggle the visibility of the options dropdown
  toggleOptions(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.optionsIndex = this.optionsIndex === index ? null : index;
  }

  // Mark/unmark a song as favorite
  toggleFavorite($event: MouseEvent, song: Song) {
    $event.stopPropagation();
    song.isFavorite = !song.isFavorite;
    this.optionsIndex = null; // Close options dropdown
    const index = ALL_SONGS.findIndex((_song: Song) => _song.website === song.website);
    this.favoriteList[index] = !this.favoriteList[index]
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }
  // Add/remove a song from playlist
  togglePlaylist() {
    this.optionsIndex = null; // Close options dropdown
  }

  // Share the song
  shareSong(song: Song) {
    console.log(`Sharing song: ${song.song_name}`);
    this.optionsIndex = null; // Close options dropdown
  }

  onClick($event: MouseEvent, song: Song) {
    $event.stopPropagation();
    this.optionsIndex = null; // Close options dropdown
    this.songClicked.emit(song);
  }

  downloadSong($event: MouseEvent, song: Song) {
    $event.stopPropagation();
    downloadSong(song.song_url);
    this.optionsIndex = null;
  }

  highlight(text: string | number | null): string | null {
    if (!text) {
      return null;
    } else if (!this.sharedDataService.filteredText) {
      return text + '';
    }
    text = text + '';
    const re = new RegExp(this.sharedDataService.filteredText, 'gi');
    if (re.test(text)) {
      return text.replace(re, (match) => `<mark>${match}</mark>`);
    }
    return text;
  }
}
