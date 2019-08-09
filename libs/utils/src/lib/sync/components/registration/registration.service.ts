import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly key = 'name';
  readonly users$ = this.syncService.getAllViewersValues(this.key)
    .pipe(map(a => {
      return a ? Object.entries(a).map((([userId, {name}]) => ({userId, name}))) : [];
    }));

  name = '';
  readonly currentUser$ = this.syncService.getCurrentViewerValue(this.key);

  constructor(private readonly syncService: SyncService<any>) {
  }

  save() {
    this.syncService.updateViewerValue(this.key, {name: this.name});
  }

  clear() {
    this.syncService.updateViewerValue(this.key, {name: null});
  }

  drop(userId: string) {
    this.syncService.adminModifyViewerValue(this.key, userId, () => {
      return {name: null};
    });
  }
}
