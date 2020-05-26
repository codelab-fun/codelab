import { createWriteStream, existsSync, mkdirSync, outputJSON } from 'fs-extra';
import { resolve } from 'path';
import { get } from 'https';

import { ASSETS_SLIDES_PATH, SLIDES_METADATA_PATH } from './helpers/const';
import { getSlides$ } from './helpers/slides';

getSlides$.subscribe(
  async (contentUrls: string[]): Promise<void> => {
    if (!existsSync(ASSETS_SLIDES_PATH)) {
      mkdirSync(ASSETS_SLIDES_PATH);
    }

    contentUrls.forEach((contentUrl: string, i: number): void => {
      const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
      get(contentUrl, response => {
        response.pipe(createWriteStream(dest));
      });
    });

    const count = contentUrls.length;
    await outputJSON(
      SLIDES_METADATA_PATH,
      { count, contentUrls },
      { spaces: 2 }
    );

    console.log(`🚀 Generated ${count} thumbnails`);
  }
);
