import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SyncDataService } from '@codelab/utils/src/lib/sync/sync-data.service';

@Injectable({
  providedIn: 'root'
})
export class SyncRegistrationService {
  readonly key = 'name';
  name = '';

  readonly userData = this.syncDataService.getAdminAllUserData(this.key);
  readonly users$ = this.userData.valueChanges()
    .pipe(map(a => {
      return a ? Object.entries(a).map((([userId, name]) => ({userId, name}))) : [];
    }));

  readonly nameObject = this.syncDataService.getCurrentViewerObject<string>(this.key);
  readonly currentUser$ = this.nameObject.valueChanges();

  constructor(
    private readonly syncDataService: SyncDataService
  ) {
  }

  save() {
    this.nameObject.update(this.name);
  }

  clear() {
    this.nameObject.update(null);
  }

  drop(userId: string) {
    this.syncDataService.getViewerObject(this.key, userId).update(null);

  }
}
