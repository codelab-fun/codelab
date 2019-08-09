import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { SyncService, SyncStatus } from '@codelab/utils/src/lib/sync/sync.service';
import { RegistrationService } from '@codelab/utils/src/lib/sync/components/registration/registration.service';

interface SyncData {
  slide: number;
}

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css'],
  providers: [RegistrationService],
})
export class SyncButtonComponent {

  constructor(
    private readonly sync: SyncService<SyncData>,
    private readonly registrationService: RegistrationService,
    private readonly presentation: SlidesDeckComponent) {
    presentation.slideChange.subscribe((slide) => {
      this.sync.updateSession({slide});
    });


    sync.statusChange$.pipe(
      filter(status => status === SyncStatus.VIEWING),
      switchMap(() => sync.presentersData$),
      filter(a => !!a),
      map(a => Number(a.slide)),
      distinctUntilChanged()
    ).subscribe((slide) => {
      this.presentation.goToSlide(slide);
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
