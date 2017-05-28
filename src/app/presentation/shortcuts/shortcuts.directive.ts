import { Directive, HostListener } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slides-shortcuts]'
})
export class ShortcutsDirective {

  @HostListener('window:keydown.ArrowRight', ['$event.target'])
  @HostListener('window:keydown.PageDown', ['$event.target'])
  next(target) {
    if (target === document.body) {
      this.presentation.nextSlide();
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event.target'])
  @HostListener('window:keydown.PageUp', ['$event.target'])
  previous(target) {
    if (target === document.body) {
      this.presentation.previousSlide();
    }
  }

  constructor(private presentation: PresentationComponent) {

  }

}
