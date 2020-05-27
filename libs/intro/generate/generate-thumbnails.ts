import { createWriteStream, existsSync, mkdirSync, outputJSON } from 'fs-extra';
import { resolve } from 'path';
import fetch from 'node-fetch';

import { ASSETS_SLIDES_PATH, SLIDES_METADATA_PATH } from './helpers/const';
import { getSlides$ } from './helpers/slides';

getSlides$.subscribe(
  async (contentUrls: string[]): Promise<void> => {
    if (!existsSync(ASSETS_SLIDES_PATH)) {
      mkdirSync(ASSETS_SLIDES_PATH);
    }

    await Promise.all(
      contentUrls.map(async (url, i) => {
        const dest = resolve(ASSETS_SLIDES_PATH, `slide-${i}.png`);
        const writeStream = createWriteStream(dest);
        const response = await fetch(url);
        response.body.pipe(writeStream);
      })
    );

    const count = contentUrls.length;
    await outputJSON(
      SLIDES_METADATA_PATH,
      { count, contentUrls },
      { spaces: 2 }
    );

    console.log(`🚀 Generated ${count} thumbnails`);
  }
);
