import { outputJSON, readJSONSync, existsSync } from 'fs-extra';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { createInterface, Interface } from 'readline';
import { bindCallback, bindNodeCallback, defer, from, iif, of } from 'rxjs';

import { Credentials, GSlides, Token } from './types';
import { CREDENTIALS_PATH, SCOPE, TOKEN_PATH } from './const';

const isCredentialsJsonExists = existsSync(CREDENTIALS_PATH);

if (!isCredentialsJsonExists) {
  throw new Error("credentials.json doesn't exist");
}

const CREDENTIALS: Credentials = readJSONSync(CREDENTIALS_PATH);
const { client_id, client_secret, redirect_uris } = CREDENTIALS.installed;
export const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
export const gSlides: GSlides = google.slides({
  version: 'v1',
  auth: oAuth2Client
});
export const isTokenJsonExists = existsSync(TOKEN_PATH);
export const TOKEN: Token | null = isTokenJsonExists
  ? readJSONSync(TOKEN_PATH)
  : null;

if (isTokenJsonExists) {
  oAuth2Client.setCredentials(TOKEN);
}

export const readline$ = defer(() =>
  of<Interface>(
    createInterface({
      input: process.stdin,
      output: process.stdout
    })
  )
);

export const getNewToken$ = readline$.pipe(
  tap(() => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE
    });
    console.log('Authorize this app by visiting this url:', authUrl);
  }),
  switchMap(readline =>
    bindCallback(
      readline.question.bind(readline, 'Enter the code from that page here: ')
    )()
  ),
  switchMap(code =>
    bindNodeCallback(oAuth2Client.getToken.bind(oAuth2Client))(code)
  ),
  tap(([token]): void => {
    oAuth2Client.setCredentials(token);
  }),
  switchMap(([token]) => from(outputJSON(TOKEN_PATH, token, { spaces: 2 }))),
  switchMapTo(readline$),
  tap(readline => readline.close())
);

export const validateToken$ = iif(
  () => isTokenJsonExists,
  of(TOKEN),
  getNewToken$.pipe(mapTo(TOKEN))
);
