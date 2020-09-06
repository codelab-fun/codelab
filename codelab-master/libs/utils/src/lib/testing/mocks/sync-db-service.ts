import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { of } from 'rxjs';

export function getSyncDbService() {
  return [
    {
      provide: SyncDataService,
      useValue: {
        getPresenterObject() {
          return {
            valueChanges() {
              return of({});
            }
          };
        }
      }
    }
  ];
}
