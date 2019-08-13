import { Component } from '@angular/core';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { of } from 'rxjs';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncSessionService } from '@codelab/utils/src/lib/sync/services/sync-session.service';
import { toValuesWithKey } from '@codelab/utils/src/lib/sync/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'slides-sync-sessions',
  templateUrl: './sync-sessions.component.html',
  styleUrls: ['./sync-sessions.component.css'],
  providers: [
    SyncDataService,
    SyncSessionService,
    SyncDbService,
  ],
})
export class SyncSessionsComponent {
  readonly displayedColumns = ['owner', 'key', 'active', 'actions'];
  private readonly sessions = this.sessionsService.sessions$;


  constructor(private readonly sessionsService: SyncSessionService) {
  }



  remove(key: string) {
    this.sessionsService.remove(key);
  }
}
