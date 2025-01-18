import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Song } from '../../interfaces/songs';
import { SharedDataService } from '../../services/shared-data.service';
import { DEFAULT_THUMBNAIL } from '../../constants';
import { getRandomIntegerInRange, initFavorite, retriveSource, scrollToCard } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; // Reference to the audio element

  allSongs: Song[] = [];
  searchQuery: string = '';
  currentSong: WritableSignal<Song | null> = signal(null);
  currentSongIndex = -1;
  songLoading = false;
  muted = false;
  currentTime: number = JSON.parse(sessionStorage.getItem('currentTime') || '0');
  duration: number = 0;
  isLooped: boolean = false;
  isSuffled: boolean = JSON.parse(localStorage.getItem('isSuffled') || 'false');
  progress: number = 0;
  volume: number = JSON.parse(sessionStorage.getItem('volume') || '100');
  favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]');
  defaultThumbnail = DEFAULT_THUMBNAIL
  songsVisited: Set<number> = new Set();
  retriveSource = retriveSource
  expanded = false;
  playBarHeight = '0';
  constructor(
    public sharedDataService: SharedDataService,
    private _cdr: ChangeDetectorRef
  ) {
    initFavorite(this.allSongs);
    effect(() => {
      this.currentSong = this.sharedDataService?.currentSong;
      this.currentSongIndex = this.allSongs.findIndex((song: Song) => this.currentSong()?.website === song.website);
      this.allSongs = this.sharedDataService.currentPlayingPlaylist?.songs || [];
    })
  }



  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT' && !target.isContentEditable) {
      this.onKeyPress(event);
    }
  }

  ngAfterViewInit() {
    if (this.audioPlayer) {
      setTimeout(() => {
        this.audioPlayer.nativeElement.currentTime = this.currentTime;
        this.updateProgress();
      }, 1000)
    }
    scrollToCard(this.currentSongIndex + '');

  }

  get isExpanded() {
    return this.audioPlayer?.nativeElement.paused || this.expanded
  }

  toggleLoop(): void {
    this.isLooped = !this.isLooped;
    if (!this.expanded) {
      this.expanded = true;
      setTimeout(() => {
        this.expanded = false;

      }, 1000);
    }
  }

  toggleSuffle(): void {
    this.isSuffled = !this.isSuffled;
    if (!this.isSuffled) {
      this.songsVisited.clear();
    }
    if (!this.expanded) {
      this.expanded = true;
      setTimeout(() => {
        this.expanded = false;

      }, 1000);
    }
    localStorage.setItem('isSuffled', JSON.stringify(this.isSuffled));
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  toggleFavorite(index: number): void {
    this.currentSong() && (this.currentSong.update(
      (song:Song | null) => {
        song && (song.isFavorite = !this.currentSong()?.isFavorite);
        return song
      } ));
    this.favoriteList[index] = !this.favoriteList[index]
    if (!this.expanded) {
      this.expanded = true;
      setTimeout(() => {
        this.expanded = false;

      }, 1000);
    }
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }

  setCurrentSong(song: Song | null): void {
    this.sharedDataService.currentSong = song
  }

  togglePlay(expandOnPause = true): void {
    if (this.duration) {
      if (this.sharedDataService.isSongPlaying) {
        this.audioPlayer.nativeElement.pause(); // Pause the audio
        sessionStorage.setItem('currentTime', JSON.stringify(this.currentTime));
        setTimeout(() => {
          if (expandOnPause) {
            this.expanded = false;
          }
        }
          , 500)
      } else {
        this.audioPlayer.nativeElement.play(); // Play the audio
        this.expanded = false;
      }
      this.sharedDataService.isSongPlaying = !this.sharedDataService.isSongPlaying; // Toggle the play/pause state
    }
  }

  getUniqueNextIndex(): number {
    if ([...this.songsVisited].length == this.allSongs.length) {
      this.songsVisited.clear();
      // this.audioPlayer.nativeElement.pause(); // Pause the audio
      return -1;

    }
    const songVisitedIndex = [...this.songsVisited].findIndex(visitedIndex => visitedIndex == this.currentSongIndex);
    if (songVisitedIndex != -1 && this.allSongs[songVisitedIndex + 1]) {
      return songVisitedIndex + 1;
    }
    let uniqueIndex = getRandomIntegerInRange(this.allSongs.length);
    while (this.songsVisited.has(uniqueIndex)) {
      uniqueIndex = getRandomIntegerInRange(this.allSongs.length)
    }
    return uniqueIndex
  }

  getUniquePrevIndex(): number {
    if ([...this.songsVisited].length < 2) {
      return getRandomIntegerInRange(this.allSongs.length);
    } else {
      return [...this.songsVisited].at(-2) || getRandomIntegerInRange(this.allSongs.length);
    }
  }

  playPrevious(): void {
    sessionStorage.setItem('currentTime', '0');
    let prevIndex;
    if (this.isSuffled) {
      prevIndex = this.getUniquePrevIndex();
    } else {
      prevIndex = (this.allSongs.length + this.currentSongIndex - 1) % this.allSongs.length;
    }
    // this.setCurrentIndex(prevIndex);
    this.setCurrentSong(this.allSongs[prevIndex])
  }

  playNext(): void {

    sessionStorage.setItem('currentTime', '0');
    let nextIndex;
    if (this.isSuffled) {
      nextIndex = this.getUniqueNextIndex();
    } else {
      nextIndex = (this.currentSongIndex + 1) % this.allSongs.length;
    }
    this.setCurrentSong(this.allSongs[nextIndex])
  }

  onProgressChange(event: any): void {
    this.progress = event.target?.value;
    this.duration = this.audioPlayer.nativeElement.duration;
    this.audioPlayer.nativeElement.currentTime = (this.progress / 100) * this.duration; // Update the audio position
  }

  updateProgress(): void {

    this.currentTime = this.audioPlayer.nativeElement.currentTime;
    this.duration = this.audioPlayer.nativeElement.duration;
    this.progress = (this.currentTime / this.duration) * 100; // Update the progress bar
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      // Trigger previous song
      this.playPrevious();
    } else if (event.shiftKey && event.key === 'ArrowRight') {
      // Trigger next song
      this.playNext();
    } else if (event.key === 'ArrowLeft') {
      this.currentSong() && this.onProgressChange({
        target: {
          value: Math.max(this.progress - 1, 0)
        }
      })
    } else if (event.key === 'ArrowRight') {
      this.currentSong() && this.onProgressChange({
        target: {
          value: Math.min(this.progress + 1, 100)
        }
      })
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.volume = Math.min(this.volume + 5, 100);
      this.onVolumeChange()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.volume = Math.max(this.volume - 5, 0);
      this.onVolumeChange()
    } else if (event.key === 'l' || event.key === 'L') {
      this.toggleLoop();
    } else if (event.key === 'f' || event.key === 'F') {
      this.toggleFavorite(this.currentSongIndex);
    } else if (event.key === 's' || event.key === 'S') {
      this.toggleSuffle();
    } else if (event.key === ' ') {
      event.preventDefault();
      this.togglePlay();
    } else if (event.key === 'm' || event.key === 'M') {
      this.toggleMute();
    } else if (event.key === 'Enter') {
      scrollToCard(this.currentSongIndex + '')
    }
    this._cdr.markForCheck();

  }

  toggleMute() {
    this.muted = !this.muted
  }

  onSongEnd(): void {
    this.sharedDataService.isSongPlaying = false; // Reset the play/pause state when the song ends
    sessionStorage.setItem('currentTime', '0');
  }

  getTime(seconds: number, isHourRequired = false): string {
    if (this.songLoading) {
      return '00:00'
    }
    // Calculate hours
    seconds = Number(seconds);
    const hours = Math.floor(seconds / 3600);

    // Calculate remaining minutes
    const minutes = isHourRequired ? Math.floor((seconds % 3600) / 60) : Math.floor(seconds / 60);

    // Calculate remaining seconds
    const remainingSeconds = seconds % 60;

    // Format as hh:mm:ss
    const formattedTime =
      (isHourRequired ? String(hours).padStart(2, '0') + ':' : '') +
      String(minutes).padStart(2, '0') + ':' +
      String(Math.round(remainingSeconds)).padStart(2, '0');

    return formattedTime;
  }

  onDataLoad() {
    this.duration = this.audioPlayer.nativeElement.duration;
    this.songLoading = false;
  }
  onLoadStart() {
    this.songLoading = true;
    this.progress = 0;
  }

  onVolumeChange() {
    sessionStorage.setItem('volume', JSON.stringify(this.volume))
  }

  exitNowPlayingBar() {
    this.sharedDataService.currentSong = null;
    sessionStorage.setItem('currentTime', '0');
  }

  hidePlayBar() {
    this.playBarHeight = '0';

  }

  showPlayBar() {
    this.playBarHeight = 'fit-content';
  }

  get songName(): string | undefined {
    return this.currentSong()?.song_name;
  }
  
  get isSongNameShort(): boolean {
    const name = this.songName;
    return name !== undefined && name.length <= 25;
  }
  
}
