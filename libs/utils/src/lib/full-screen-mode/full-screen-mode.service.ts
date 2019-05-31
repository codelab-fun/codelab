import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface FullscreenAPIMap {
  requestFullscreen: string;
  exitFullscreen: string;
  fullscreenElement: string;
}

// Fullscreen API fallback map
const FN_MAP: { [P in keyof FullscreenAPIMap]: string[] } = {
  requestFullscreen: [
    'webkitRequestFullscreen',
    'webkitRequestFullScreen',
    'mozRequestFullScreen',
    'msRequestFullscreen'
  ],
  exitFullscreen: [
    'webkitExitFullscreen',
    'webkitCancelFullScreen',
    'mozCancelFullScreen',
    'msExitFullscreen'
  ],
  fullscreenElement: [
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement',
    'mozFullScreenElement',
    'msFullscreenElement'
  ]
};

@Injectable({
  providedIn: 'root'
})
export class FullScreenModeService {

  private fn: FullscreenAPIMap;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.fn = Object.keys(FN_MAP).reduce((fns, key) => {
      fns[key] = [ key, ...FN_MAP[key] ].find(fn =>
        fn in this.document || fn in this.document.documentElement
      );

      return fns;
    }, {}) as FullscreenAPIMap;
  }

  toggleFullScreen() {
    if (this.isFullscreen()) {
      this.exitFullscreen();
    } else {
      this.requestFullscreen();
    }
  }

  isFullscreen() {
    return !!this.document[this.fn.fullscreenElement];
  }

  requestFullscreen(el: HTMLElement = null) {
    const element = el || this.document.documentElement;
    return this.call(element, this.fn.requestFullscreen);
  }

  exitFullscreen() {
    return this.call(this.document, this.fn.exitFullscreen);
  }

  private call(el: Document | Element, fn: string): Promise<void> {
    return fn ? el[fn]() : undefined;
  }
}
