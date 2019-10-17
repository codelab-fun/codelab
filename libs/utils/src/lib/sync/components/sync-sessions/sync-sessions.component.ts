import { Component } from '@angular/core';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';

@Component({
  selector: 'codelab-sync-sessions',
  templateUrl: './sync-sessions.component.html',
  styleUrls: ['./sync-sessions.component.css'],
  providers: [SyncDataService, SyncSessionService, SyncDbService]
})
export class SyncSessionsComponent {
  readonly displayedColumns = ['name', 'owner', 'key', 'active', 'actions'];

  constructor(readonly sessionsService: SyncSessionService) {}

  remove(key: string) {
    this.sessionsService.remove(key);
  }
}
