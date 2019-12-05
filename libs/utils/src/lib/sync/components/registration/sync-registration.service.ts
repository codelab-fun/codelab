import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';

@Injectable({
  providedIn: 'root'
})
export class SyncRegistrationService {
  readonly key = 'name';
  name = '';

  readonly userData = this.syncDataService.getAdminAllUserData(this.key);
  readonly usersMap$ = this.userData.valueChanges();
  readonly users$ = this.usersMap$.pipe(
    map(a => {
      return a
        ? Object.entries(a).map(([userId, name]) => ({ userId, name }))
        : [];
    })
  );

  readonly nameObject = this.syncDataService.getCurrentViewerObject(this.key);
  readonly currentUser$ = this.nameObject.valueChanges();

  readonly registrationConfig$ = this.syncDataService
    .getPresenterObject('registration')
    .withDefault({
      shouldDisplayNames: true,
      isRegistrationEnabled: true
    })
    .valueChanges();

  readonly shouldDisplayNames$ = this.registrationConfig$.pipe(
    map(a => a.shouldDisplayNames)
  );
  readonly isRegistrationEnabled$ = this.registrationConfig$.pipe(
    map(a => a.isRegistrationEnabled)
  );

  constructor(private readonly syncDataService: SyncDataService) {}

  save() {
    const name = this.name.trim();
    if (name !== '') {
      this.nameObject.set(name);
    }
  }

  clear() {
    this.nameObject.set(null);
  }

  drop(userId: string) {
    this.syncDataService.getViewerObject(this.key, userId).set(null);
  }
}
