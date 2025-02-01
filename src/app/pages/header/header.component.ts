import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
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

  constructor(private _sharedDataService: SharedDataService) {
    initFavorite(ALL_SONGS);
  }


  onSearch(): void {
    this._sharedDataService.filteredText = this.searchQuery;
  }

  onClear(): void {
    this._sharedDataService.filteredText = this.searchQuery = '';
  }
}
