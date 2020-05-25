import {
  readJSON,
  outputJSON,
  createWriteStream,
  existsSync,
  mkdirSync
} from 'fs-extra';
import { resolve } from 'path';
import { createInterface, Interface } from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { get } from 'https';
import {
  bindCallback,
  bindNodeCallback,
  forkJoin,
  from,
  ObservableInput,
  of
} from 'rxjs';
import {
  catchError,
  finalize,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { GSlides, Credentials, Token } from './types';

const CODELAB_PRESENTATION_ID = '1ecaXVe5qRS3YcphrTK9JVAaD1qNhLDkLhwgZIZTfNzw';
const CREDENTIALS_PATH = resolve(__dirname, 'credentials.json');
const TOKEN_PATH = resolve(__dirname, 'token.json');
const SLIDES_METADATA_PATH = resolve(__dirname, 'slides.json');
const ASSETS_SLIDES_PATH = resolve(__dirname, '../assets/slides');

const oAuth2Client$ = from<ObservableInput<Credentials>>(
  readJSON(CREDENTIALS_PATH)
).pipe(
  map(credentials => credentials.installed),
  map(
    ({ client_id, client_secret, redirect_uris }): OAuth2Client =>
      new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
  ),
  shareReplay(1)
);

const slides$ = oAuth2Client$.pipe(
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
  ),
  tap(contentUrls => {
    if (!existsSync(ASSETS_SLIDES_PATH)) {
      mkdirSync(ASSETS_SLIDES_PATH);
    }

    contentUrls.forEach((contentUrl, i) => {
      const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
      get(contentUrl, response => {
        response.pipe(createWriteStream(dest));
      });
    });
  }),
  switchMap(contentUrls =>
    from(
      outputJSON(
        SLIDES_METADATA_PATH,
        { count: contentUrls.length, contentUrls },
        { spaces: 2 }
      )
    )
  )
);

const readline$ = of<Interface>(
  createInterface({
    input: process.stdin,
    output: process.stdout
  })
);

const getNewToken$ = oAuth2Client$.pipe(
  tap(oAuth2Client => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/presentations.readonly']
    });
    console.log('Authorize this app by visiting this url:', authUrl);
  }),
  withLatestFrom(readline$),
  switchMap(([, readline]) =>
    bindCallback(
      readline.question.bind(readline, 'Enter the code from that page here: ')
    )()
  ),
  withLatestFrom(oAuth2Client$),
  switchMap(([code, oAuth2Client]) =>
    bindNodeCallback(oAuth2Client.getToken.bind(oAuth2Client))(code)
  ),
  withLatestFrom(oAuth2Client$),
  map(([[token], oAuth2Client]) => {
    oAuth2Client.setCredentials(token);
    return token;
  }),
  switchMap(token => from(outputJSON(TOKEN_PATH, token, { spaces: 2 })))
);

const token$ = from<ObservableInput<Token>>(readJSON(TOKEN_PATH)).pipe(
  withLatestFrom(oAuth2Client$),
  tap(([token, oAuth2Client]) => {
    oAuth2Client.setCredentials(token);
  }),
  catchError(() => getNewToken$),
  switchMap(() => slides$),
  withLatestFrom(readline$),
  tap(([, readline]) => readline.close()),
  finalize((): void => console.log('Completed ✅ '))
);

token$.pipe(take(1)).subscribe(() => {});
