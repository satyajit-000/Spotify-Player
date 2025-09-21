import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-genres',
  imports: [DecimalPipe],
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css', '../music-analytics.component.css']
})
export class GenresComponent {
  private musicAnalyticsService = inject(MusicAnalyticsService)

  genreDistributionCount = 10;
  readonly analytics = this.musicAnalyticsService.analytics;
  readonly getProgressColor = this.musicAnalyticsService.getProgressColor.bind(this);
  readonly navigateToPlaylist = this.musicAnalyticsService.navigateToPlaylist.bind(this);
}
