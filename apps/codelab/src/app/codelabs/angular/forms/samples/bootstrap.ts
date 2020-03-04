import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ResourceLoader } from '@angular/compiler';
import * as code from './code';

class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = Object.keys(code).find(key =>
      key.includes(url.replace(/[\/\.-]/gi, '_'))
    );
    const template = code[templateId];
    if (!template) {
      console.log(template);
      // tslint:disable-next-line:no-debugger
      debugger;
    }
    return Promise.resolve(template);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{ provide: ResourceLoader, useClass: MyResourceLoader, deps: [] }]
} as any);
