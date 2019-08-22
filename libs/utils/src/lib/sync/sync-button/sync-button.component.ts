import { Component } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';
import { distinctUntilChanged, filter, mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css'],
  providers: [SyncRegistrationService],
})
export class SyncButtonComponent {
  sync = {};
  private readonly currentSlide = this.syncDataService.getPresenterObject<number>('currentSlide');

  constructor(
    private readonly syncDataService: SyncDataService,
    readonly syncSessionService: SyncSessionService,
    readonly registrationService: SyncRegistrationService,
    private readonly presentation: SlidesDeckComponent) {
    this.syncSessionService.autoJoin();

    this.syncSessionService.status$.pipe(
      filter(s => s === SyncStatus.PRESENTING),
      mergeMapTo(presentation.slideChange),
      distinctUntilChanged(),
    )
      .subscribe((slide: number) => {
        this.currentSlide.set(slide);
      });

    this.syncSessionService.status$.pipe(
      filter(s => s !== SyncStatus.PRESENTING),
      mergeMapTo(this.currentSlide.valueChanges()),
      distinctUntilChanged(),
      filter(s => s !== null)
    )
      .subscribe((slide: number) => {
        presentation.goToSlide(slide);
      });
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

  present() {
    this.syncSessionService.present();
  }

  administer() {
    this.syncSessionService.administer();
  }
}
