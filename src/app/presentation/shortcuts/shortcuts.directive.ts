import {Directive, HostListener} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Directive({
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
