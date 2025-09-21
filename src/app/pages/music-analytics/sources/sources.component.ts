import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { retriveSource } from '../../../utils';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sources',
  imports: [DecimalPipe],
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css', '../music-analytics.component.css']
})
export class SourcesComponent {
private musicAnalyticsService = inject(MusicAnalyticsService)
  sourceDistributionCount = 10;
  analytics = this.musicAnalyticsService.analytics;
  getProgressColor = this.musicAnalyticsService.getProgressColor;
  retriveSource = retriveSource;
}
