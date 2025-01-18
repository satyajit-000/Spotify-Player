import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'spotify-player';
}
