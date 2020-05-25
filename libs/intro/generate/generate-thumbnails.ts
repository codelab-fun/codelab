import { createWriteStream, existsSync, mkdirSync, outputJSON } from 'fs-extra';
import { ASSETS_SLIDES_PATH, SLIDES_METADATA_PATH } from './helpers/const';
import { resolve } from 'path';
import { get } from 'https';
import { from } from 'rxjs';
import { getSlides$ } from './helpers/slides';

getSlides$.subscribe((contentUrls: string[]) => {
  if (!existsSync(ASSETS_SLIDES_PATH)) {
    mkdirSync(ASSETS_SLIDES_PATH);
  }

  contentUrls.forEach((contentUrl, i) => {
    const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
    get(contentUrl, response => {
      response.pipe(createWriteStream(dest));
    });
  });

  from(
    outputJSON(
      SLIDES_METADATA_PATH,
      { count: contentUrls.length, contentUrls },
      { spaces: 2 }
    )
  ).subscribe();

  console.log('Completed ✅ ');
});
