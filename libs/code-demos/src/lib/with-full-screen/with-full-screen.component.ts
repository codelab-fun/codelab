import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'codelab-with-full-screen',
  templateUrl: './with-full-screen.component.html',
  styleUrls: ['./with-full-screen.component.scss']
})
export class WithFullScreenComponent {
  @HostBinding('class.fullscreen') isFullScreen: boolean = false;

  toggleFullScreen() {
    return (this.isFullScreen = !this.isFullScreen);
  }
}
