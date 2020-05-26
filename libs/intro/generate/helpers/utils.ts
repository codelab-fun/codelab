import { outputJSON, readJSON } from 'fs-extra';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import {
  map,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { createInterface, Interface } from 'readline';
import {
  bindCallback,
  bindNodeCallback,
  from,
  ObservableInput,
  of
} from 'rxjs';

import { Credentials } from './types';
import { CREDENTIALS_PATH, SCOPE, TOKEN_PATH } from './const';

export const oAuth2Client$ = from<ObservableInput<Credentials>>(
  readJSON(CREDENTIALS_PATH)
).pipe(
  map(credentials => credentials.installed),
  map(
    ({ client_id, client_secret, redirect_uris }): OAuth2Client =>
      new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
  ),
  shareReplay(1)
);

export const readline$ = of<Interface>(
  createInterface({
    input: process.stdin,
    output: process.stdout
  })
);

export const getNewToken$ = oAuth2Client$.pipe(
  tap(oAuth2Client => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE
    });
    console.log('Authorize this app by visiting this url:', authUrl);
  }),
  switchMapTo(readline$),
  switchMap(readline =>
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
