import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
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
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  searchQuery = '';
  smallScreen = window.innerWidth <= 750;


  constructor(private _sharedDataService:SharedDataService){ }

  ngOnInit(): void {
    this.checkScreenSize();
    initFavorite(ALL_SONGS);
  }

  private checkScreenSize() {
    this.smallScreen = window.innerWidth <= 750;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  
  onSearch(): void {
    this._sharedDataService.filteredText = this.searchQuery;
  }
}
