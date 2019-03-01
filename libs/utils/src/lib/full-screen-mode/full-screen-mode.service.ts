import { Injectable } from '@angular/core';

@Injectable()
export class FullScreenModeService {

  constructor() { }

  toggleFullScreen() {
    // check if page is in fullscreen
    if (document['fullscreenElement']) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
