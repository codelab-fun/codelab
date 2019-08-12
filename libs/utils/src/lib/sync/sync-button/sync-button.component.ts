import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';

interface SyncData {
  slide: number;
}

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css'],
  providers: [SyncRegistrationService],
})
export class SyncButtonComponent {

  sync = {};

  constructor(
    private readonly syncDataService: SyncDataService,
    private readonly syncSessionService: SyncSessionService,
    private readonly registrationService: SyncRegistrationService,
    private readonly presentation: SlidesDeckComponent) {
    this.syncSessionService.autoJoin();
    // presentation.slideChange.subscribe((slide) => {
    //   this.sync.updateSession({slide});
    // });


    // sync.statusChange$.pipe(
    //   filter(status => status === SyncStatus.VIEWING),
    //   switchMap(() => sync.presentersData$),
    //   filter(a => !!a),
    //   map(a => Number(a.slide)),
    //   distinctUntilChanged()
    // ).subscribe((slide) => {
    //   this.presentation.goToSlide(slide);
    // });
  }

  start() {
    this.syncSessionService.create();
  }

  stop() {
    this.syncSessionService.dropCurrentSession();
  }

  dropSession() {
    // this.sync.dropCurrentSession();
  }

  follow(session) {
    // this.sync.follow(session);
  }
}
