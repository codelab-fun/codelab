import { Component } from '@angular/core';

@Component({
  selector: 'codelab-with-full-screen',
  templateUrl: './with-full-screen.component.html',
  styleUrls: ['./with-full-screen.component.scss']
})
export class WithFullScreenComponent {

  public isFullScreen: boolean;

  toggleFullScreen() {
    return (this.isFullScreen = !this.isFullScreen);
  }
}
