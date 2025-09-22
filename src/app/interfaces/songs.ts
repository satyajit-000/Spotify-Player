export class Song {
  song_name: string;
  song_url: string;
  thumbnail: string | null;
  singers: string[] | null;
  language?: string | null;
  lyricist: string | null;
  source: string;
  website: string;
  music_composer?: string | null;
  published_on?: string | null;
  duration?: string | null;
  genre?: string | null; 
  isFavorite?: boolean;

  constructor (
    song_name: string, 
    song_url: string, 
    source: string, 
    website: string, 
    thumbnail: string | null, 
    language: string| null = null, 
    singers: string[] | null, 
    lyricist: string | null, 
    music_composer: string | null, 
    published_on: string | null = null, 
    duration: string | null = null, 
    genre: string | null = null, 
    isFavorite = false
  ) {
    this.song_name = song_name;
    this.song_url = song_url;
    this.source = source;
    this.website = website;
    this.thumbnail = thumbnail;
    this.singers = singers;
    this.lyricist = lyricist;
    this.music_composer = music_composer;
    this.published_on = published_on;
    this.duration = duration;
    this.genre = genre;
    this.isFavorite = isFavorite;
    this.language = language;
  }
}
