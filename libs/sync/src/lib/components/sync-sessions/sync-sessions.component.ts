import { Component } from '@angular/core';
import { SyncSessionService } from "../../services/sync-session.service";
import { SyncDataService } from "../../services/sync-data.service";
import { SyncDbService } from '../../services/sync-db.service';

@Component({
  selector: 'codelab-sync-sessions',
  templateUrl: './sync-sessions.component.html',
  styleUrls: ['./sync-sessions.component.css'],
  providers: [SyncDataService, SyncSessionService, SyncDbService],
})
export class SyncSessionsComponent {
  readonly displayedColumns = ['name', 'owner', 'key', 'active', 'actions'];

  constructor(readonly sessionsService: SyncSessionService) {}

  remove(key: string) {
    this.sessionsService.remove(key);
  }
}
