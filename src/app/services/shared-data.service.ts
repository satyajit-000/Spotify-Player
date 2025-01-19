import { Injectable, signal, WritableSignal } from '@angular/core';
import { Song } from '../interfaces/songs';
import { ALL_SONGS } from '../constants';
import { Playlist } from '../models/playlists';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _currentSong = signal<Song | null>(
    (() => {
      const currentSong = sessionStorage.getItem('currentSong');
      try {
        return currentSong ? JSON.parse(currentSong) as Song : null;
      } catch (error) {
        console.error('Error parsing currentSong from sessionStorage:', error);
        return null;
      }
    })() as Song | null
  )
  private _allSongs:Song[] = ALL_SONGS;
  private _filteredText = signal<string>('');
  private _isSongPlaying = signal<boolean>(false);
  private _currentPlayingPlaylist = signal<Playlist | null>(
    (() => {
      const currentPlayingPlaylist = sessionStorage.getItem('currentPlayingPlaylist');
      try {
        return currentPlayingPlaylist ? JSON.parse(currentPlayingPlaylist) as Playlist : null;
      } catch (error) {
        console.error('Error parsing currentSong from sessionStorage:', error);
        return null;
      }
    })() as Playlist | null
  );

  get currentSong(): WritableSignal<Song | null> {
    return this._currentSong
  }
  // Setter to update the current song
  set currentSong(song :Song | null) {
    this._currentSong.set(song);
    sessionStorage.setItem('currentSong', JSON.stringify(song));
  }

  get allSongs(): Song[] {
    return this._allSongs;
  }

  get filteredText(): string {
    return this._filteredText().trim().toLowerCase();
  }
  set filteredText(text:string) {
    this._filteredText.update(value=>text);
  }

  get isSongPlaying():boolean {
    return this._isSongPlaying();
  }
  set isSongPlaying(_isSongPlaying:boolean) {
    this._isSongPlaying.set(_isSongPlaying);
  }

  get currentPlayingPlaylist():Playlist|null {
    return this._currentPlayingPlaylist();
  }
  set currentPlayingPlaylist(playlist:Playlist | null) {
    this._currentPlayingPlaylist.set(playlist);
    sessionStorage.setItem('currentPlayingPlaylist', JSON.stringify(playlist));
  }
}