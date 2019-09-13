import { Component, Input, OnInit, Optional } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';
import { distinctUntilChanged, filter, mergeMapTo, take } from 'rxjs/operators';

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css'],
  providers: [SyncRegistrationService]
})
export class SyncButtonComponent implements OnInit {
  @Input() name = 'default';

  sync = {};
  private readonly currentSlide = this.syncDataService.getPresenterObject<
    number
  >('currentSlide');

  constructor(
    private readonly syncDataService: SyncDataService,
    readonly syncSessionService: SyncSessionService,
    readonly registrationService: SyncRegistrationService,
    @Optional() private readonly presentation: SlidesDeckComponent
  ) {}

  ngOnInit(): void {
    this.syncSessionService.autoJoin(this.name);

    if (this.presentation) {
      this.syncSessionService.status$
        .pipe(
          filter(s => s === SyncStatus.PRESENTING),
          mergeMapTo(this.presentation.slideChange),
          distinctUntilChanged()
        )
        .subscribe((slide: number) => {
          this.currentSlide.set(slide);
        });

      this.syncSessionService.status$
        .pipe(
          filter(s => s !== SyncStatus.PRESENTING),
          mergeMapTo(this.currentSlide.valueChanges()),
          distinctUntilChanged(),
          filter(s => s !== null)
        )
        .subscribe((slide: number) => {
          this.presentation.goToSlide(slide);
        });
    }
  }

  start(): void {
    this.syncSessionService.create(this.name);
  }

  stop(): void {
    this.syncSessionService.dropCurrentSession();
  }

  present(): void {
    this.syncSessionService.present();
  }

  administer(): void {
    this.syncSessionService.administer();
  }

  copyViewerId(): void {
    this.syncSessionService.viewerId$
      .pipe(take(1))
      .subscribe(viewerId => copyToClipboard(viewerId));
  }
}

function copyToClipboard(text: string): void {
  const inputElement = document.createElement('input');
  inputElement.value = text;
  inputElement.select();
  document.execCommand('copy');
  inputElement.remove();
}
