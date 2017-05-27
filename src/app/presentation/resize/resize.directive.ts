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

  static getZoomFactor(slideSize: Size, windowSize: Size) {
    return Math.min(windowSize.width / slideSize.width, windowSize.height / slideSize.height);
  }

  constructor(private presentation: PresentationComponent) {
    this.resize();
  }

  @HostListener('window:resize')
  resize() {
    // TODO: Maybe get this back
  }

}
