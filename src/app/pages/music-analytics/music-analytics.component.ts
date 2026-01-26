import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Song } from '../../interfaces/songs';
import { AnalyticsData } from '../../interfaces/analytics';
import { ALL_SONGS } from '../../constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-music-analytics',
  imports: [CommonModule, RouterModule],
  templateUrl: './music-analytics.component.html',
  styleUrl: './music-analytics.component.css'
})
export class MusicAnalyticsComponent {
  tabs = [
    {
      "name": "overview",
      "iconClass": "fas fa-chart-pie",
      "routes": [
        "overview"
      ]
    },
    {
      "name": "languages",
      "iconClass": "fas fa-language",
      "routes": [
        "languages"
      ]
    },
    {
      "name": "genres",
      "iconClass": "fas fa-tags",
      "routes": [
        "genres"
      ]
    },
    {
      "name": "artists",
      "iconClass": "fas fa-users",
      "routes": [
        "artists"
      ]
    },
    {
      "name": "timeline",
      "iconClass": "fas fa-calendar-alt",
      "routes": [
        "timeline"
      ]
    },
    {
      "name": "sources",
      "iconClass": "fas fa-database",
      "routes": [
        "sources"
      ]
    }
  ];
  songsData: Song[] = ALL_SONGS;
  analytics: AnalyticsData = {
    languageData: [],
    genreData: [],
    timelineData: [],
    sourceData: [], // Added source data
    topSingers: [],
    topComposers: [],
    topLyricists: [],
    durationStats: {
      totalMinutes: 0,
      avgMinutes: 0,
      shortSongs: 0,
      mediumSongs: 0,
      longSongs: 0
    },
    totalSongs: 0,
    uniqueArtists: 0,
    uniqueLanguages: 0,
    uniqueGenres: 0,
    uniqueSources: 0, // Added unique sources count
    songsPerYear: 0,
    mostActiveYear: 0,
    oldestSong: '',
    newestSong: ''
  };

  ngOnInit(): void {
    this.calculateAnalytics();
  }

  private convertDuration(duration: string): number {
    if (!duration || duration === '') return 0;
    const parts = duration.split(':').map(Number);
    return parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
  }

  private calculateAnalytics(): void {
    if (!this.songsData || this.songsData.length === 0) return;

    // Language distribution
    const languageCount = this.songsData.reduce((acc, song) => {
      if (!song.language) return acc;
      acc[song.language] = (acc[song.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const languageData = Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .map(([lang, count]) => ({
        name: lang,
        value: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Genre distribution
    const genreCount = this.songsData.reduce((acc, song) => {
      const genre = song.genre || 'Unknown';
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const genreData = Object.entries(genreCount)
      .sort(([, a], [, b]) => b - a)
      .map(([genre, count]) => ({
        name: genre,
        value: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Source distribution analysis
    const sourceCount = this.songsData.reduce((acc, song) => {
      const source = song.source || 'Unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sourceData = Object.entries(sourceCount)
      .sort(([, a], [, b]) => b - a)
      .map(([source, count]) => ({
        name: source,
        value: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Timeline analysis
    const releaseYears = this.songsData.reduce((acc, song) => {
      const year = new Date(song.published_on || '').getFullYear();
      if (!isNaN(year) && year > 1900) {
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
    
    const timelineData = Object.entries(releaseYears)
      .sort(([year1,], [year2,]) => new Date(year2).getTime() - new Date(year1).getTime())
      .sort(([, a], [, b]) => b - a)
      .map(([year, count]) => ({
        year: Number(year),
        songs: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Artists analysis
    const singerCount = this.songsData.reduce((acc, song) => {
      if (song.singers && Array.isArray(song.singers)) {
        song.singers.forEach(singer => {
          if (singer && singer.trim()) {
            acc[singer.trim()] = (acc[singer.trim()] || 0) + 1;
          }
        });
      }
      return acc;
    }, {} as Record<string, number>);

    const topSingers = Object.entries(singerCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([singer, count]) => ({
        name: singer,
        songs: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Composers analysis
    const composerCount = this.songsData.reduce((acc, song) => {
      if (song.music_composer && song.music_composer.trim()) {
        acc[song.music_composer.trim()] = (acc[song.music_composer.trim()] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topComposers = Object.entries(composerCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([composer, count]) => ({
        name: composer,
        songs: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Lyricists analysis
    const lyricistCount = this.songsData.reduce((acc, song) => {
      if (song.lyricist && song.lyricist.trim()) {
        acc[song.lyricist.trim()] = (acc[song.lyricist.trim()] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topLyricists = Object.entries(lyricistCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([lyricist, count]) => ({
        name: lyricist,
        songs: count,
        percentage: ((count / this.songsData.length) * 100).toFixed(1)
      }));

    // Duration analysis
    const durations = this.songsData
      .filter(song => song.duration)
      .map(song => this.convertDuration(song.duration || '0:00'))
      .filter(d => d > 0);

    const totalMinutes = Math.floor(durations.reduce((a, b) => a + b, 0) / 60);
    const avgMinutes = durations.length > 0 ? Math.floor(durations.reduce((a, b) => a + b, 0) / durations.length / 60) : 0;

    const durationStats = {
      totalMinutes,
      avgMinutes,
      shortSongs: durations.filter(d => d < 180).length,
      mediumSongs: durations.filter(d => d >= 180 && d < 300).length,
      longSongs: durations.filter(d => d >= 300).length
    };

    // Additional stats
    const years = timelineData.map(d => d.year).filter(y => y > 1900);
    const oldestYear = Math.min(...years);
    const newestYear = Math.max(...years);
    const mostActiveYear = timelineData[0]?.year || 0;

    this.analytics = {
      languageData,
      genreData,
      timelineData,
      sourceData, // Added source data
      topSingers,
      topComposers,
      topLyricists,
      durationStats,
      totalSongs: this.songsData.length,
      uniqueArtists: Object.keys(singerCount).length,
      uniqueLanguages: languageData.length,
      uniqueGenres: genreData.length,
      uniqueSources: sourceData.length, // Added unique sources count
      songsPerYear: timelineData.length > 0 ? this.songsData.length / timelineData.length : 0,
      mostActiveYear,
      oldestSong: oldestYear.toString(),
      newestSong: newestYear.toString()
    };
  }
}
