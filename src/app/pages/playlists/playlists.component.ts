import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-playlists',
  imports: [RouterOutlet],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent {

}
