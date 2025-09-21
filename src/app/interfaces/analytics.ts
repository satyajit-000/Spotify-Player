
export interface AnalyticsData {
  languageData: ProgressData[];
  genreData: ProgressData[];
  timelineData: TimelineData[];
  sourceData: SourceData[];
  topSingers: ArtistData[];
  topComposers: ArtistData[];
  topLyricists: ArtistData[];
  durationStats: DurationStats;
  totalSongs: number;
  uniqueArtists: number;
  uniqueLanguages: number;
  uniqueGenres: number;
  uniqueSources: number;
  songsPerYear: number;
  mostActiveYear: number;
  oldestSong: string;
  newestSong: string;
}

export interface ProgressData {
  name: string;
  value: number;
  percentage: string;
}

export interface ArtistData {
  name: string;
  songs: number;
  percentage?: string;
}

export interface TimelineData {
  year: number;
  songs: number;
  percentage: string;
}

export interface SourceData {
  name: string;
  value: number;
  percentage: string
}

export interface DurationStats {
  totalMinutes: number;
  avgMinutes: number;
  shortSongs: number;
  mediumSongs: number;
  longSongs: number;
}
