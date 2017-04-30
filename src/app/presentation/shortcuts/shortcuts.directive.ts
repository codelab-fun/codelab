import {Directive, HostListener} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[app-shortcuts]'
})
export class ShortcutsDirective {

  @HostListener('window:keydown.ArrowRight')
  @HostListener('window:keydown.PageDown')
  next() {
    this.presentation.nextSlide(true);
  }

  @HostListener('window:keydown.ArrowLeft')
  @HostListener('window:keydown.PageUp')
  previous() {
    this.presentation.previousSlide(true);
  }

  constructor(private presentation: PresentationComponent) {

  }

}
