import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-timeline',
  imports: [DecimalPipe],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css', '../music-analytics.component.css']
})
export class TimelineComponent {
  private musicAnalyticsService = inject(MusicAnalyticsService);

  analytics = this.musicAnalyticsService.analytics;
  collectionSpanYears = this.musicAnalyticsService.collectionSpanYears;
  getEraCount = this.musicAnalyticsService.getEraCount;
  navigateToPlaylist = this.musicAnalyticsService.navigateToPlaylist
  timelineDistributionCount = 10;
}
