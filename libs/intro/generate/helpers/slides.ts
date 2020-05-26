import { defer, forkJoin, from, ObservableInput } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import { CODELAB_PRESENTATION_ID } from './const';
import { gSlides, validateToken$ } from './utils';

export const getSlides$ = validateToken$.pipe(
  switchMapTo(
    defer(() =>
      from(
        gSlides.presentations.get({
          presentationId: CODELAB_PRESENTATION_ID
        })
      )
    )
  ),
  map(response => response.data.slides.map(slide => slide.objectId)),
  switchMap(objectIds => {
    const thumbnailRequests: ObservableInput<string>[] = objectIds.map(
      (pageObjectId: string): ObservableInput<string> =>
        from(
          gSlides.presentations.pages.getThumbnail({
            presentationId: CODELAB_PRESENTATION_ID,
            pageObjectId
          })
        ).pipe(map(response => response.data.contentUrl))
    );
    return forkJoin(thumbnailRequests);
  })
);
