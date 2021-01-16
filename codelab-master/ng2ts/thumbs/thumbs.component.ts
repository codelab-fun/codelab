import {Component, Output, EventEmitter} from '@angular/core';

/**
 * Yes, TypeScript has enums!
 * There's no nice way to use them in the template though.
 */
export enum Thumbs {
  UP,
  DOWN
}
/*d:thumbsComponentCreateSolved/trimTrailing*/
@Component({
  selector: 'my-thumbs',
  templateUrl: 'thumbs.html'
})
/*/d*/
export class ThumbsComponent {
  /*d:thumbsComponentCreateSolved/trimBoth*/
  @Output() onThumbs: EventEmitter<Thumbs> = new EventEmitter<Thumbs>();

  thumbsUp() {
    this.onThumbs.emit(Thumbs.UP)
  }

  thumbsDown() {
    this.onThumbs.emit(Thumbs.DOWN)
  }
  /*/d*/
}
