import {Directive, HostListener} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

interface Size {
  width: number;
  height: number;
}

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slides-auto-resize]'
})
export class ResizeDirective {
  @HostListener('window:resize')
  static getZoomFactor(slideSize: Size, windowSize: Size) {
    return Math.min(windowSize.width / slideSize.width, windowSize.height / slideSize.height);
  }

  constructor(private presentation: PresentationComponent) {
    this.resize();
  }

  resize() {
    // TODO(kirjs): Is there a way to make this component more generic?
    // Resize any component?
    // Rely on something better than global window size?
    const windowSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };

    // this.presentation.zoom = ResizeDirective.getZoomFactor(this.presentation, windowSize);
  }

}
