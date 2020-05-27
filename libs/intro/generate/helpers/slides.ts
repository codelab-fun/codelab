import { forkJoin, from, ObservableInput, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CODELAB_PRESENTATION_ID } from './const';
import { gSlides$ } from './utils';
import { GSlides } from './types';

const getSlides = (gSlides: GSlides): ObservableInput<string[]> =>
  of(gSlides).pipe(
    switchMap(() =>
      gSlides.presentations.get({
        presentationId: CODELAB_PRESENTATION_ID
      })
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

export const getSlides$ = gSlides$.pipe(switchMap(getSlides));
