import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { filter, switchMap } from 'rxjs/operators';
import { SyncService, SyncStatus } from '@codelab/utils/src/lib/sync/sync.service';

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


    sync.statusChange$.pipe(
      filter(status => status === SyncStatus.VIEWING),
      switchMap(() => sync.presentersData$),
      filter(a => !!a),
    ).subscribe(({slide}) => {
      this.presentation.goToSlide(Number(slide));
    });
  }

  start() {
    this.sync.startSession({
      slide: this.presentation.activeSlideIndex,
    });
  }

  dropSession() {
    this.sync.dropCurrentSession();
  }

  follow(session) {
    this.sync.follow(session);
  }
}
