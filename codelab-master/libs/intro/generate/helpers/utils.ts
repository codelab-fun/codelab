import { outputJSON, readJSONSync, existsSync } from 'fs-extra';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { createInterface, Interface } from 'readline';
import {
  bindCallback,
  bindNodeCallback,
  defer,
  from,
  iif,
  ObservableInput,
  of
} from 'rxjs';
import { mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Credentials, Token } from './types';
import { CREDENTIALS_PATH, SCOPE, TOKEN_PATH } from './const';

if (!existsSync(CREDENTIALS_PATH)) {
  throw new Error("credentials.json doesn't exist");
}

const CREDENTIALS: Credentials = readJSONSync(CREDENTIALS_PATH);
const { client_id, client_secret, redirect_uris } = CREDENTIALS.installed;
const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
const isTokenJsonExists = existsSync(TOKEN_PATH);
const TOKEN: Token | null = isTokenJsonExists ? readJSONSync(TOKEN_PATH) : null;

const readline$ = defer(() =>
  of<Interface>(
    createInterface({
      input: process.stdin,
      output: process.stdout
    })
  )
).pipe(shareReplay(1));

const getNewToken = (readline: Interface) =>
  readline$.pipe(
    tap(() => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE
      });
      console.log('Authorize this app by visiting this url:', authUrl);
    }),
    switchMap(() =>
      bindCallback(
        readline.question.bind(readline, 'Enter the code from that page here: ')
      )()
    ),
    switchMap(
      (code): ObservableInput<[Token]> =>
        bindNodeCallback(oAuth2Client.getToken.bind(oAuth2Client))(code)
    ),
    switchMap(
      ([token]): ObservableInput<Token> =>
        from(outputJSON(TOKEN_PATH, token, { spaces: 2 })).pipe(mapTo(token))
    ),
    tap(() => readline.close())
  );

const getNewToken$ = readline$.pipe(switchMap(getNewToken));

const validateToken$ = iif(
  () => isTokenJsonExists,
  of(TOKEN),
  getNewToken$
).pipe(
  tap(token => {
    oAuth2Client.setCredentials(token);
  })
);

export const gSlides$ = of(
  google.slides({
    version: 'v1',
    auth: oAuth2Client
  })
).pipe(switchMap(gSlides => validateToken$.pipe(mapTo(gSlides))));
