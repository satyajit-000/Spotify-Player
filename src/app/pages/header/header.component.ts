import { ChangeDetectionStrategy, Component, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';
import { RouterLink } from '@angular/router';
import { initFavorite } from '../../utils';
import { ALL_SONGS } from '../../constants';
@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  searchQuery = '';

  get smallScreen() {
    return computed(() => window.innerWidth <= 800)();
  }

  constructor(public sharedDataService: SharedDataService) {
    initFavorite(ALL_SONGS);
    effect(() => {
      this.searchQuery = this.sharedDataService.filteredText;
    })
  }


  onSearch(): void {
    // this.sharedDataService.filteredText = this.searchQuery;
  }

  onClear(): void {
    this.sharedDataService.filteredText = this.searchQuery = '';
  }

  get placeholder() {
    if (window.innerWidth <= 540) {
      return 'Search songs...';
    } else if (window.innerWidth < 770) {
      return 'Search for songs, artists, or lang...'
    } 
    return 'Search for songs, artists, or language'
  }
}
