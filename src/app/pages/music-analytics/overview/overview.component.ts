import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [DecimalPipe],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css', '../music-analytics.component.css']
})
export class OverviewComponent {
  private musicAnalyticsService = inject(MusicAnalyticsService)

  analytics = this.musicAnalyticsService.analytics;

}
