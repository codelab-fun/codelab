import { readJSON } from 'fs-extra';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { forkJoin, from, ObservableInput } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { GSlides, Token } from './types';
import { CODELAB_PRESENTATION_ID, TOKEN_PATH } from './const';
import { oAuth2Client$, getNewToken$ } from './utils';

export const fetchSlides$ = oAuth2Client$.pipe(
  map((auth: OAuth2Client): GSlides => google.slides({ version: 'v1', auth })),
  switchMap((gSlides: GSlides) =>
    from(
      gSlides.presentations.get({
        presentationId: CODELAB_PRESENTATION_ID
      })
    ).pipe(
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
    )
  )
);

export const getSlides$ = from<ObservableInput<Token>>(
  readJSON(TOKEN_PATH)
).pipe(
  withLatestFrom(oAuth2Client$),
  tap(([token, oAuth2Client]) => {
    oAuth2Client.setCredentials(token);
  }),
  catchError(() => getNewToken$),
  switchMapTo(fetchSlides$)
);
