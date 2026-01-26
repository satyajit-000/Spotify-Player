import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Song } from '../../interfaces/songs';
import { ALL_SONGS } from '../../constants';
import { RouterModule } from '@angular/router';

interface Tab {
  name: string;
  iconClass: string;
  routes: string[];
}

@Component({
  selector: 'app-music-analytics',
  imports: [CommonModule, RouterModule],
  templateUrl: './music-analytics.component.html',
  styleUrl: './music-analytics.component.css'
})
export class MusicAnalyticsComponent {
  songsData: Song[] = ALL_SONGS;

  tabs: Tab[] = [
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
}
