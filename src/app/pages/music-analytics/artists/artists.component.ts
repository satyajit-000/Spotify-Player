import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-artists',
  imports: [DecimalPipe],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css', '../music-analytics.component.css']
})
export class ArtistsComponent {

  private musicAnalyticsService = inject(MusicAnalyticsService)

  artistDistributionCount = 10;
  readonly analytics = this.musicAnalyticsService.analytics;
  readonly navigateToPlaylist = this.musicAnalyticsService.navigateToPlaylist.bind(this);
}
