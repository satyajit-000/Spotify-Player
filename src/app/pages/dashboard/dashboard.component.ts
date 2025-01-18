import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  sideBarOpen = window.innerWidth > 1080;


  ngOnInit(): void {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.sideBarOpen = window.innerWidth >= 1000;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  toggleSidebar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}