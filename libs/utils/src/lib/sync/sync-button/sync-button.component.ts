import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { filter, switchMap } from 'rxjs/operators';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';

interface SyncData {
  slide: number;
}

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css']
})
export class SyncButtonComponent {

  constructor(
    private readonly sync: SyncService<SyncData>,
    private readonly presentation: SlidesDeckComponent) {
    presentation.slideChange.subscribe((slide) => {
      this.sync.updateSession({slide});
    });


    sync.isPresenting$.pipe(
      filter(a => !a),
      switchMap(() => sync.presentersValue$)
    ).subscribe(({slide}) => {
      this.presentation.goToSlide(Number(slide));
    });
  }

  start() {
    this.sync.startSession({
      slide: this.presentation.activeSlideIndex,
    });
  }

  follow({value}: { value: string }) {
    this.sync.follow(value);
  }
}
