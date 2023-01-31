import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ResourceLoader } from '@angular/compiler';
import * as code from './code';
import { AppModule } from './app.module';

class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {

    let searchString = url.replace(/[\/\.-]/gi, '_');

    // TODO(sancheez): fix load templates with relative url (relative url in Component)
    if (url.startsWith(".")) {
      searchString = searchString.substring(2);
    }

    const templateId = Object.keys(code).find((key) =>
      key.includes(searchString)
    );
    const template = code[templateId];
    if (!template) {
      console.log(template);
      debugger;
    }
    return Promise.resolve(template);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    providers: [
      {
        provide: ResourceLoader,
        useFactory: () => new MyResourceLoader(),
        deps: [],
      },
    ],
  },
]);
