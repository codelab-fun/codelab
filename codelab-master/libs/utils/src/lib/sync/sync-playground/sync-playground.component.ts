import { Component } from '@angular/core';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';

@Component({
  selector: 'codelab-sync-playground',
  templateUrl: './sync-playground.component.html',
  styleUrls: ['./sync-playground.component.scss']
})
export class SyncPlaygroundComponent {
  SyncStatus = SyncStatus;
}
