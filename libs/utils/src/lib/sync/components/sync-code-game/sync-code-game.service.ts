import { Injectable } from '@angular/core';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SyncCodeGameService {
  private readonly key = 'coding';
  readonly viewerStatus = this.syncDataService
    .getCurrentViewerObject(this.key)
    .object('session');

  private readonly allStatus = this.syncDataService.getAdminAllUserData(
    this.key
  );

  readonly allStatuses$ = this.allStatus.valueChanges().pipe(
    map(a => {
      return Object.entries(a || {}).map(([name, value]) => ({
        name,
        status: value.session
      }));
    })
  );

  constructor(private readonly syncDataService: SyncDataService) {}
}
