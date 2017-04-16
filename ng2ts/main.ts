import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
/*d:templatePageSetup/trimLeading*/
import {ResourceLoader} from '@angular/compiler';
import * as code from './code';

// The code below is used to match the Components with the appropriate templates.
//
class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = Object.keys(code).find(key => key.includes(url.replace(/[\/\.-]/gi, '_')));
    let template = code[templateId];
    if (!template) {

      console.log(template);
      debugger;
    }
    return Promise.resolve(template);
  };
}
/*/d*//*d:bootstrapSolved/trimTrailing*/
const platform = platformBrowserDynamic();
/*/d*//*d:bootstrapSolved:bootstrapSolved/trimTrailing*/
platform.bootstrapModule(AppModule);
/*/d*//*d:templatePageSetup*/
platform.bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});
/*/d*/
