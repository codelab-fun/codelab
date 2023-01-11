import { of } from 'rxjs';
import { SyncDataService } from '../../services/sync-data.service';

export function getSyncDbService() {
  return [
    {
      provide: SyncDataService,
      useValue: {
        getPresenterObject() {
          return {
            valueChanges() {
              return of({});
            },
          };
        },
      },
    },
  ];
}
