import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, ElementRef, HostListener, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Song } from '../../interfaces/songs';
import { SharedDataService } from '../../services/shared-data.service';
import { ALL_SONGS, DEFAULT_THUMBNAIL } from '../../constants';
import { retriveSource, scrollToCard } from '../../utils';
import _ from 'lodash';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, ScrollingModule, NzIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements AfterViewInit, OnDestroy {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; // Reference to the audio element
  @ViewChild('toggleShuffleList') toggleShuffleListBtn!: ElementRef<HTMLButtonElement>;

  allSongs!: Song[];
  shuffledSongs!: Song[];
  currentSong: WritableSignal<Song | null> = signal(null);
  currentSongIndex = -1;
  songLoading = false;
  muted = false;
  currentTime: number = JSON.parse(sessionStorage.getItem('currentTime') || '0');
  duration = 0;
  isLooped = false;
  isSuffled: boolean = JSON.parse(localStorage.getItem('isSuffled') || 'false');
  progress = 0;
  volume: number = JSON.parse(sessionStorage.getItem('volume') ?? '100');
  favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '[]');
  defaultThumbnail = DEFAULT_THUMBNAIL
  retriveSource = retriveSource;
  expanded = false;
  playBarHeight = '0';
  currentPlayingPlaylistId: string | number = -1;
  currentShufflePlaying = false;

  isSuffleListOpen = false;
  isDragEnable = signal(false);
  private saveTimeInterval: null | ReturnType<typeof setInterval> = null;

  playingImage = 'https://i.gifer.com/Nt6v.gif';
  pauseImage = 'https://i.gifer.com/fetch/w300-preview/55/554818561cbf36d813ef2010cc9d66cc.gif';

  constructor(
    public sharedDataService: SharedDataService,
    private _cdr: ChangeDetectorRef,
  ) {
    // Initial setup from shared service
    this.initializePlaylist();

    // Track playlist changes with effects
    effect(() => {
      this.syncPlaylistData();
    });
  }

  // Initialize playlist based on shared service data
  private initializePlaylist(): void {
    this.currentPlayingPlaylistId = this.sharedDataService.currentPlayingPlaylist?.id ?? -1;
    this.allSongs = this.sharedDataService.currentPlayingPlaylist?.songs ?? [];
    this.shuffledSongs = this.isSuffled ? _.shuffle(this.allSongs) : [...this.allSongs];
    this.setCurrentSongIndex();
  }

  // Synchronize playlist data when it changes
  private syncPlaylistData(): void {
    const playlistChanged = this.currentPlayingPlaylistId !== this.sharedDataService.currentPlayingPlaylist?.id || !this.allSongs.length;

    if (playlistChanged) {
      this.initializePlaylist();
    }

    this.currentSong = this.sharedDataService?.currentSong;
    this.setCurrentSongIndex();

    if (this.isSuffled && !this.currentShufflePlaying) {
      this.shuffleCurrentSong();
    }

    this.currentShufflePlaying = false;
    scrollToCard(this.currentSongIndex + '');
  }

  // Set the index of the current song in the shuffled list
  private setCurrentSongIndex(): void {
    this.currentSongIndex = this.shuffledSongs.findIndex((song: Song) => this.currentSong()?.website === song.website);
  }

  // Move the current song to the start of the shuffled list
  private shuffleCurrentSong(): void {
    this.setCurrentSongIndex();
    const [song] = this.shuffledSongs.splice(this.currentSongIndex, 1);
    this.shuffledSongs.splice(0, 0, song);
    this.currentSongIndex = 0;
  }

  // Update shuffled songs based on shuffle state
  private updateShuffledSongs(): void {
    if (this.isSuffled) {
      this.shuffledSongs = _.shuffle(this.allSongs);
      this.shuffleCurrentSong();
    } else {
      this.shuffledSongs = [...this.allSongs];
      this.setCurrentSongIndex();
    }
  }

  // Handle the expanded state toggling logic
  private handleExpandedState(): void {
    if (!this.expanded) {
      this.expanded = true;
      setTimeout(() => {
        this.expanded = false;
      }, 1000);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT' && !target.isContentEditable) {
      try {
        this.onKeyPress(event);
      } catch (error) { }
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

  ngOnDestroy(): void {
    this.stopSavingTime();
  }
  get isExpanded() {
    return this.audioPlayer?.nativeElement.paused || this.expanded || this.isSuffleListOpen;
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

  // Toggle shuffle state and update playlist accordingly
  toggleSuffle(): void {
    this.isSuffled = !this.isSuffled;
    this.updateShuffledSongs();

    // Handle expanded state toggle
    this.handleExpandedState();

    // Persist shuffle state in localStorage
    localStorage.setItem('isSuffled', JSON.stringify(this.isSuffled));
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  toggleFavorite(song: Song | null): void {
    this.currentSong() && (this.currentSong.update(
      (song: Song | null) => {
        song && (song.isFavorite = !this.currentSong()?.isFavorite);
        return song
      }));
    const index = ALL_SONGS.findIndex(_song => _song.website === song?.website)
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

  private startSavingTime(): void {
    // Clear any existing interval
    this.stopSavingTime();

    // Save every 4 seconds (you can adjust this)
    this.saveTimeInterval = setInterval(() => {
      sessionStorage.setItem('currentTime', JSON.stringify(this.currentTime));
    }, 2000);
  }

  private stopSavingTime(): void {
    if (this.saveTimeInterval) {
      clearInterval(this.saveTimeInterval);
      this.saveTimeInterval = null;
    }
    // Save one final time when stopping
    sessionStorage.setItem('currentTime', JSON.stringify(this.currentTime));
  }

  togglePlay(expandOnPause = true): void {
    if (this.duration) {
      if (this.sharedDataService.isSongPlaying) {
        this.audioPlayer.nativeElement.pause(); // Pause the audio
        sessionStorage.setItem('currentTime', JSON.stringify(this.currentTime));
        this.stopSavingTime();
        setTimeout(() => {
          if (expandOnPause) {
            this.expanded = false;
          }
        }, 500);
      } else {
        this.audioPlayer.nativeElement.play(); // Play the audio
        if (this.saveTimeInterval === null) {
          this.startSavingTime();
        }
        this.expanded = false;
      }
      this.sharedDataService.isSongPlaying = !this.sharedDataService.isSongPlaying; // Toggle the play/pause state
    }
  }

  playPrevious(): void {
    sessionStorage.setItem('currentTime', '0');
    const prevIndex = (this.shuffledSongs.length + this.currentSongIndex - 1) % this.shuffledSongs.length;
    this.setCurrentSong(this.shuffledSongs[prevIndex])
    this.stopSavingTime();
    if (this.saveTimeInterval === null) {
      this.startSavingTime();
    }
    this.currentShufflePlaying = true;
  }

  playNext(): void {

    sessionStorage.setItem('currentTime', '0');
    const nextIndex = (this.currentSongIndex + 1) % this.shuffledSongs.length;
    this.setCurrentSong(this.shuffledSongs[nextIndex]);
    this.stopSavingTime();
    if (this.saveTimeInterval === null) {
      this.startSavingTime();
    }
    this.currentShufflePlaying = true;
  }

  onPlaying() {
    console.log('playing');
    this.sharedDataService.isSongPlaying = true;
    // this.stopSavingTime();
    if (this.saveTimeInterval === null) {
      this.startSavingTime();
    }
  }

  onProgressChange(event: any): void {
    this.progress = event.target?.value;
    this.duration = this.audioPlayer.nativeElement.duration;
    this.currentTime = this.audioPlayer.nativeElement.currentTime = (this.progress / 100) * this.duration; // Update the audio position
    sessionStorage.setItem('currentTime', JSON.stringify(this.currentTime));
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
      this.toggleFavorite(this.currentSong());
    } else if (event.key === 's' || event.key === 'S') {
      this.toggleSuffle();
    } else if (event.key === ' ') {
      event.preventDefault();
      this.togglePlay();
    } else if (event.key === 'm' || event.key === 'M') {
      this.toggleMute();
    } else if (event.key === 'Enter') {
      scrollToCard(this.currentSongIndex + '')
    } else if (event.key === 'q' || event.key === 'Q') {
      this.toggleSuffleList()
      this.toggleShuffleListBtn.nativeElement.focus();
    }
    this._cdr.markForCheck();

  }

  toggleMute() {
    this.muted = !this.muted
  }

  toggleSuffleList() {
    this.isSuffleListOpen = !this.isSuffleListOpen;
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

  drop(event: CdkDragDrop<Song[]>) {
    const prevSong = this.shuffledSongs.slice(this.currentSongIndex)[event.currentIndex]
    const currSong = this.shuffledSongs.slice(this.currentSongIndex)[event.previousIndex]
    const previousIndex = this.shuffledSongs.findIndex(song => song.website === prevSong.website)
    const currentIndex = this.shuffledSongs.findIndex(song => song.website === currSong.website)
    moveItemInArray(this.shuffledSongs, currentIndex, previousIndex);
    this.setCurrentSongIndex();
  }

  get innerWidth() {
    return computed(() => window.innerWidth)
  };

  getCdkDisabled(song: Song) {
    return song.website === this.currentSong()?.website || !this.isDragEnable()
  }

  startHold() {
    this.isDragEnable.set(true);
    this._cdr.detectChanges();
  }

  stopHold() {
    this.isDragEnable.set(false); // disable when released or mouse leaves
    this._cdr.detectChanges();
  }
}
