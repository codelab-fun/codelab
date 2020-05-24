import {
  readJSON,
  outputJSON,
  createWriteStream,
  existsSync,
  mkdirSync
} from 'fs-extra';
import { resolve } from 'path';
import { createInterface } from 'readline';
import { google } from 'googleapis';
import { get } from 'https';

const CODELAB_PRESENTATION_ID = '1ecaXVe5qRS3YcphrTK9JVAaD1qNhLDkLhwgZIZTfNzw';
const CREDENTIALS_PATH = resolve(__dirname, 'credentials.json');
const TOKEN_PATH = resolve(__dirname, 'token.json');
const SLIDES_METADATA_PATH = resolve(__dirname, 'slides.json');
const ASSETS_SLIDES_PATH = resolve(__dirname, '../assets/slides');

async function main() {
  const credentials = await readJSON(CREDENTIALS_PATH);
  await authorize(credentials);
}

main().then();

async function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  try {
    const token = await readJSON(TOKEN_PATH);
    oAuth2Client.setCredentials(token);
    await listSlides(oAuth2Client);
    console.log('Completed ✅ ');
  } catch (error) {
    console.log(error);
    getNewToken(oAuth2Client);
    console.log('Completed ✅ ');
  }
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/presentations.readonly']
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();

    oAuth2Client.getToken(code, async (err, token) => {
      if (err) {
        return console.error('Error retrieving access token', err);
      }

      console.log({ TOKEN_PATH, token });
      await outputJSON(TOKEN_PATH, token, { spaces: 2 });
      oAuth2Client.setCredentials(token);
      await listSlides(oAuth2Client);
    });
  });
}

async function listSlides(auth) {
  const googleSlides = google.slides({ version: 'v1', auth });
  const {
    data: { slides }
  } = await googleSlides.presentations.get({
    presentationId: CODELAB_PRESENTATION_ID
  });
  const objectIds = slides.map(slide => slide.objectId);
  const contentUrls = await Promise.all(
    objectIds.map(async pageObjectId => {
      const response = await googleSlides.presentations.pages.getThumbnail({
        presentationId: CODELAB_PRESENTATION_ID,
        pageObjectId
      });

      return response.data.contentUrl;
    })
  );

  if (!existsSync(ASSETS_SLIDES_PATH)) {
    mkdirSync(ASSETS_SLIDES_PATH);
  }

  for (let i = 0; i < contentUrls.length; i += 1) {
    const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
    get(contentUrls[i], response => {
      response.pipe(createWriteStream(dest));
    });
  }

  await outputJSON(
    SLIDES_METADATA_PATH,
    { count: slides.length, contentUrls },
    { spaces: 2 }
  );
}
