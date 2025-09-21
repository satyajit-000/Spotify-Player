import { Component, inject } from '@angular/core';
import { MusicAnalyticsService } from '../../../services/music-analytics.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-language',
  imports: [DecimalPipe],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css', '../music-analytics.component.css']
})
export class LanguageComponent {
  private musicAnalyticsService = inject(MusicAnalyticsService)
  readonly analytics = this.musicAnalyticsService.analytics;
  readonly getProgressColor = this.musicAnalyticsService.getProgressColor.bind(this);
  readonly navigateToPlaylist = this.musicAnalyticsService.navigateToPlaylist.bind(this);
  
  languageDistributionCount = 10;
}
