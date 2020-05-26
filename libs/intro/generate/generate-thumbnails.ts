import { createWriteStream, existsSync, mkdirSync, outputJSON } from 'fs-extra';
import { ASSETS_SLIDES_PATH, SLIDES_METADATA_PATH } from './helpers/const';
import { resolve } from 'path';
import { get } from 'https';
import { getSlides$ } from './helpers/slides';

getSlides$.subscribe((contentUrls: string[]): void => {
  if (!existsSync(ASSETS_SLIDES_PATH)) {
    mkdirSync(ASSETS_SLIDES_PATH);
  }

  contentUrls.forEach((contentUrl, i) => {
    const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
    get(contentUrl, response => {
      response.pipe(createWriteStream(dest));
    });
  });

  outputJSON(
    SLIDES_METADATA_PATH,
    { count: contentUrls.length, contentUrls },
    { spaces: 2 }
  ).then();

  console.log('Completed ✅ ');
});
