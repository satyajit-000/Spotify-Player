import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { navigations } from '../../_nav';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  dashboardItems = navigations;
  sideBarOpen = input.required<boolean>();
  toggleSideBar = output();

  onToggleSidebar() {
    this.toggleSideBar.emit();
  }
}
