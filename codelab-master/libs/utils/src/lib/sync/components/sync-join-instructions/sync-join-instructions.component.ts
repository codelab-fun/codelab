import { Component } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';

@Component({
  selector: 'codelab-sync-join-instructions',
  templateUrl: './sync-join-instructions.component.html',
  styleUrls: ['./sync-join-instructions.component.css']
})
export class SyncJoinInstructionsComponent {
  readonly key = 'joinUrl';
  readonly defaultValue = 'kirjs.com/start';

  url: string;
  readonly joinUrl$ = this.syncDataService
    .getPresenterObject('registration')
    .object(this.key)
    .withDefault(this.defaultValue)
    .valueChanges();

  constructor(private readonly syncDataService: SyncDataService) {}
}
