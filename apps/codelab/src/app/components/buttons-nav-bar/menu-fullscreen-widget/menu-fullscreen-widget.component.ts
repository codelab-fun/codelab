import { Component } from '@angular/core';
import { FullScreenModeService } from '@ng360/slides';

@Component({
  selector: 'codelab-menu-fullscreen-widget',
  templateUrl: './menu-fullscreen-widget.component.html',
  styleUrls: ['./menu-fullscreen-widget.component.scss']
})
export class MenuFullscreenWidgetComponent {
  constructor(private fullScreenService: FullScreenModeService) {}

  openFullScreen() {
    this.fullScreenService.toggleFullScreen();
  }
}
